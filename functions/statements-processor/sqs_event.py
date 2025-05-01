import json
import os
from s3_util import get_file_buffer
from mpesa_util import MpesaStatementParser



def handle_sqs_event(record):
    print(f"Received record: {record}")

    message_id = record.get("messageId")
    if not message_id:
        print("No Message ID found in the record")
        return {"error": "Message ID not found", "record": record}

    print(f"Processing Message ID: {message_id}")

    try:
        body = record.get("body")
        payload = json.loads(body)
        print(f"Parsed payload: {payload}")
    except (json.JSONDecodeError, TypeError) as e:
        print(f"Failed to parse message body: {e}")
        return {"messageId": message_id, "error": f"Failed to parse body: {str(e)}"}

    content = payload.get("content")
    password = content.get("password")
    file_key = content.get("url")
    if not password or not file_key:
        print("Missing required fields: password or file_key")
        return {"messageId": message_id, "error": "Missing required fields"}

    bucket_name = os.environ.get("DOCUMENT_BUCKET")
    if not bucket_name:
        print("DOCUMENT_BUCKET environment variable is not set")
        return {"messageId": message_id, "error": "DOCUMENT_BUCKET env missing"}

    try:
        file_buffer = get_file_buffer(bucket_name=bucket_name, key=file_key)
        print("Retrieved file buffer from S3")
    except Exception as e:
        print(f"Failed to retrieve file from S3: {e}")
        return {"messageId": message_id, "error": f"Failed to retrieve file: {str(e)}"}

    try:
        with MpesaStatementParser(file_buffer, password) as parser:
            transactions = parser.get_summary()
            print(f"Parsed transactions successfully for {message_id}")
            return {"messageId": message_id, "transactions": transactions}
    except Exception as e:
        print(f"Failed to parse Mpesa statement: {e}")
        return {
            "messageId": message_id,
            "error": f"Failed to parse statement: {str(e)}",
        }
