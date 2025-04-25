from pydantic import BaseModel
from datetime import datetime
from typing import List


# --- Data Models --- #
class Customer(BaseModel):
    name: str
    phone: str
    email: str | None


class Period(BaseModel):
    start: datetime
    end: datetime
    duration: int


class AccountSummary(BaseModel):
    period: Period
    sent: float
    received: float
    deposit: float
    withdrawal: float
    paybill: float
    buy_goods: float
    others_in: float
    others_out: float


class Transaction(BaseModel):
    date: datetime
    status: str
    type: str
    amount: float
    details: str


class AccountStatement(BaseModel):
    customer: Customer
    period: Period
    summary: AccountSummary
    transactions: List[Transaction]


SUMMARY_KEY_MAP = {
    "SEND MONEY": ("sent", "PAID OUT"),
    "RECEIVED MONEY": ("received", "PAID IN"),
    "AGENT DEPOSIT": ("deposit", "PAID IN"),
    "AGENT WITHDRAWAL": ("withdrawal", "PAID OUT"),
    "LIPA NA M-PESA (PAYBILL)": ("paybill", "PAID OUT"),
    "LIPA NA M-PESA (BUY GOODS)": ("buy_goods", "PAID OUT"),
    "OTHERS": ("others", None),
}

INTI_SUMMARY = {
    "sent": 0.0,
    "received": 0.0,
    "deposit": 0.0,
    "withdrawal": 0.0,
    "paybill": 0.0,
    "buy_goods": 0.0,
    "others_in": 0.0,
    "others_out": 0.0,
}
