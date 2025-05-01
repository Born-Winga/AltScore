# lambda_handler.py

import json
from api_handler import ApiHandler
from events_handler import EventsHandler

# Instantiate ApiHandler ONCE (cold start optimization)
api_instance = ApiHandler()


def handler(event, context):
    is_api_request = event.get("httpMethod")

    if is_api_request:
        print("API Request received:\n", json.dumps(event))
        # Pass the event into the Mangum handler (api_instance.api)
        response = api_instance.api(event, context)
        return response

    else:
        # Handle non-API events (e.g., SQS, DynamoDB Streams)
        records = event.get("Records", [])
        record = records[0]
        source = record.get("eventSource")
        if source == "aws:sqs":
            print("SQS Event received:\n", json.dumps(record))
            event_handler = EventsHandler(records=records, event_type=source)
            results = event_handler.handle_event()
            print(f"Queue Processing Results: {results}")

        elif source == "aws:dynamodb":
            print("DynamoDB Stream Event received:\n", json.dumps(record))
            # Handle DynamoDB event here

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Event processed successfully"}),
        }
