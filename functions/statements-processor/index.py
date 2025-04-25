from starlette.requests import Request
from fastapi import FastAPI
from mangum import Mangum
from mpesa_statement import MpesaStatementParser

app = FastAPI()


@app.get("/statements")
def hello(request: Request):
    transactions = None
    with MpesaStatementParser("*****", "****") as parser:
        transactions = parser.get_summary()
        print("DONE")
        print(transactions)
    return transactions


@app.post("/statements")
def hello(request: Request):
    return {"aws_event": request.scope["aws.event"]}


@app.put("/statements")
def hello(request: Request):
    return {"aws_event": request.scope["aws.event"]}


@app.delete("/statements")
def hello(request: Request):
    return {"aws_event": request.scope["aws.event"]}


handler = Mangum(app, lifespan="off")
