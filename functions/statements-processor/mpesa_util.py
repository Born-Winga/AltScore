from typing import List
from pdfplumber.page import Page # type: ignore
import pdfplumber
from datetime import datetime
import math
import logging
from model_types import (
    AccountSummary,
    Transaction,
    SUMMARY_KEY_MAP,
    Period,
    INTI_SUMMARY,
)


# Disable verbose logging from pdfminer
logging.getLogger("pdfminer").setLevel(logging.ERROR)


class MpesaStatementParser:
    summary: AccountSummary
    transactions: List[Transaction]
    pages: List[Page] | None

    def __init__(self, file: str, pwd=None):
        """
        Initializes the parser with access to all pages of the MPESA PDF statement.
        """
        try:
            print(f"Debug 14: {pwd}")
            self.pdf = (
                pdfplumber.open(file, password=pwd) if pwd else pdfplumber.open(file)
            )
            self.pages = self.pdf.pages
        except (StopIteration, IndexError, ValueError) as e:
            raise ValueError(f"Failed to open statement: {e}")

    def get_period(self) -> Period:
        """
        This function extracts the statement period from the first page of a document and calculates the
        duration in months.
        :return: The code snippet is a method named `get_period` that is supposed to extract the statement
        period from a document. It tries to find the line containing "Statement Period" in the first page
        of the document, extract the date range from that line, parse the start and end dates, calculate
        the duration in months, and return a `Period` object with the start date, end date, and duration
        """
        self.has_pages()
        try:
            first_page = self.pages[0]
            print(first_page)
            text = first_page.extract_text()
            line = next(
                line for line in text.splitlines() if "Statement Period" in line
            )
            date_range = line.split(":")[1].split("-")
            print(date_range)
            start = datetime.strptime(date_range[0].strip(), "%d %b %Y")
            end = datetime.strptime(date_range[1].strip(), "%d %b %Y")
            duration = math.ceil((end - start).days / 30.44)
            return Period(start=start, end=end, duration=duration)
        except (StopIteration, IndexError, ValueError) as e:
            raise ValueError(f"Failed to parse statement period: {e}")

    def has_pages(self):
        """
        The function `has_pages` checks if the `pages` attribute is `None` and raises an exception if it
        is.
        """
        if self.pages == None:
            raise Exception("Pages len=0:File not read")

    def get_summary(self):
        """
        This function extracts transaction data from the first page of a PDF document and creates an
        account summary based on the extracted information.
        :return: An `AccountSummary` object is being returned with the period and summary details
        extracted from the first page of the MPESA statement. The summary details include transaction
        types such as "others_in" and "others_out" along with other specific transaction types mapped in
        the `SUMMARY_KEY_MAP`. The values are extracted from the table rows based on the column headers
        and then used to populate the `AccountSummary
        """
        first_page = self.pages[0]
        tables = first_page.extract_tables()
        if not tables:
            raise ValueError("No tables found on the first page for mpesa statement.")

        period = self.get_period()
        table = tables[0]
        header = [h.strip() for h in table[0]]
        rows = table[1:]

        col_index = {col: i for i, col in enumerate(header)}

        for row in rows:
            if not row or len(row) < len(header):
                continue
            trans_type = row[col_index["TRANSACTION TYPE"]].strip().replace(":", "")
            if trans_type in SUMMARY_KEY_MAP:
                key, col = SUMMARY_KEY_MAP[trans_type]
                if key == "others":
                    INTI_SUMMARY["others_in"] = float(
                        row[col_index.get("PAID IN", -1)].replace(",", "") or 0
                    )
                    INTI_SUMMARY["others_out"] = float(
                        row[col_index.get("PAID OUT", -1)].replace(",", "") or 0
                    )
                else:
                    col_name = col
                    INTI_SUMMARY[key] = float(
                        row[col_index.get(col_name, -1)].replace(",", "") or 0
                    )
        print(f"Debug 16")
        return AccountSummary(period=period, **INTI_SUMMARY)

    def get_transaction(self) -> List[List[List[str]]]:
        self.has_pages()
        tables = [
            table
            for page in self.pages
            for table in page.extract_tables()
            if table and table[0][0] == "Receipt No."
        ]
        return self.flatten_tables(tables)

    def flatten_tables(self, tables: List[List[List[str]]]) -> List[dict]:
        flattened = []
        for table in tables:
            if not table or table[0][0] != "Receipt No.":
                continue
            header = table[0]
            for row in table[1:]:
                if len(row) == len(header):
                    record = {header[i]: row[i] for i in range(len(header))}
                    flattened.append(record)
        return flattened

    def close(self):
        if hasattr(self, "pdf") and self.pdf:
            self.pdf.close()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.close()
