from sqs_event import handle_sqs_event
from typing import List, Dict, Any

class EventsHandler:
    def __init__(self, records: List[Dict[str, Any]], event_type: str):
        self.records = records
        self.event_type = event_type

    def handle_event(self) -> List[Dict[str, Any]]:
        if self.event_type == "aws:sqs":
            print("Processing SQS")
            return self.handle_sqs_events()
        elif self.event_type == "aws:dynamodb":
            return self.handle_dynamodb_events()
        else:
            raise ValueError(f"Unsupported event type: {self.event_type}")

    def handle_sqs_events(self) -> List[Dict[str, Any]]:
        results = []
        for record in self.records:
            print("Processing SQS message")
            try:
                response = handle_sqs_event(record)
                results.append(response)
            except Exception as e:
                results.append({
                    "error": str(e),
                    "messageId": record.get("messageId"),
                    "record": record
                })
        return results

    def handle_dynamodb_events(self) -> Dict[str, Any]:
        return {"message": "DynamoDB event handling not implemented yet"}
