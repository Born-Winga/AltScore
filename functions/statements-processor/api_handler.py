from fastapi import FastAPI
from starlette.requests import Request
from mangum import Mangum
from mpesa_util import MpesaStatementParser

class ApiHandler:
    def __init__(self):
        self.app = FastAPI()
        self.register_routes()
        self.api = Mangum(self.app, lifespan="off")

    def register_routes(self):
        @self.app.get("/statements")
        async def get_statements(request: Request):
            transactions = None
            try:
                with MpesaStatementParser("./mpesa.pdf", "374244") as parser:
                    transactions = parser.get_summary()
                    print("DONE")
                    print(transactions)
            except Exception as e:
                return {"error": str(e)}
            return transactions

        @self.app.post("/statements")
        async def post_statements(request: Request):
            return {"aws_event": request.scope.get("aws.event")}

        @self.app.put("/statements")
        async def put_statements(request: Request):
            return {"aws_event": request.scope.get("aws.event")}

        @self.app.delete("/statements")
        async def delete_statements(request: Request):
            return {"aws_event": request.scope.get("aws.event")}
