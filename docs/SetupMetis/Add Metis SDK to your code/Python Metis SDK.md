# 🐍 Python Metis SDK

## **General**

Metis JS SDK allows you have insights about your SQL commands originated from your code.

Run your code as usual while Metis generates distributed traces and sends them to our servers for further analysis, then you will be able to view crucial insights about your queries.

## **Supported ORMs**

- [SQLAlchemy](https://www.sqlalchemy.org) with FastAPI or Flask

**Supported frameworks:**

- [FastAPI](https://fastapi.tiangolo.com)
- [Flask](https://flask.palletsprojects.com/en/2.3.x/)

:::tip
Check out our SDK example [projects](https://github.com/metis-data/sdk-examples/tree/main/python) that covers most of the ORMs listed above

:::

## **How it works**

Metis Python SDK listens to SQL commands on your code, it receiving their execution plans from the PG server and combine them with their REST commands.

It sends those sets to Metis, which analyze the queries and combine all this information to create an E2E view of those traces and their analysis.

## **Prerequisite**

- A Metis account with a valid API key. [🥽 Create a project & generate API key](../Create%20a%20project%20&%20generate%20API%20key.md)
- OTEL

## **Installation**

Install our Python SDK using [pip](https://pip.pypa.io/en/stable/)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="py-installation">
<TabItem value="flask" label="Flask">

```bash
pip install sqlalchemycollector
```

</TabItem>

<TabItem value="FastAPIs" label="FastAPI (Sync)">

```bash
pip install fastapialchemycollector
```

</TabItem>
<TabItem value="FastAPIa" label="FastAPI (Async)">

```bash
pip install fastapialchemycollector
```

</TabItem>
</Tabs>

Open your app's `main.py` and add the following code:

<Tabs groupId="py-installation">
<TabItem value="flask" label="Flask">

```py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemycollector import setup, MetisInstrumentor, PlanCollectType

app = Flask(__name__)
db = SQLAlchemy(app)

with app.app_context():
    instrumentation: MetisInstrumentor = setup(
        service_name='<SERVICE_NAME>',
        api_key='<API_KEY>',
        service_version='<SERVICE_VERSION>'
    )

    instrumentation.instrument_app(app, db.get_engine())

@app.route("/hello")
def home():
    return "Hello, Flask!"
```

</TabItem>

<TabItem value="FastAPIs" label="FastAPI (Sync)">

```py
from fastapi import FastAPI, APIRouter
from fastapialchemycollector import setup, MetisInstrumentor, PlanCollectType
from database.connection import engine

app = FastAPI()
api_router = APIRouter()
app.include_router(api_router)

DATABASE_URL = "postgresql://user_name:user_password@host_name:port/db_name"
engine = create_engine(DATABASE_URL)

instrumentation: MetisInstrumentor = setup(
    service_name='<SERVICE_NAME>',
    api_key='<API_KEY>',
    service_version='<SERVICE_VERSION>'
)
instrumentation.instrument_app(app, engine)

@api_router.get("/hello", status_code=200)
def helloWorld():
    return "Hello World!"
```

</TabItem>
<TabItem value="FastAPIa" label="FastAPI (Async)">

```py
from fastapi import FastAPI, APIRouter
from sqlalchemy.ext.asyncio import create_async_engine
from fastapialchemycollector import setup, MetisInstrumentor, PlanCollectType

app = FastAPI()
api_router = APIRouter()
app.include_router(api_router)

DATABASE_URL = "postgresql+asyncpg://user_name:user_password@host_name:port/db_name"
async_engine = create_async_engine(DATABASE_URL, echo=True)

instrumentation: MetisInstrumentor = setup(
    service_name='<SERVICE_NAME>',
    api_key='<API_KEY>',
    service_version='<SERVICE_VERSION>',
)

instrumentation.instrument_app(app, async_engine)
```

</TabItem>
</Tabs>

### Parameters

`service_name` - (optional) Gives ability to distinguish between services. Useful when working with Micro Services.
`service_version` - a metadata tag used for better control on the traces sent by each server.  
`api_key`- Metis Api Key [🥽 Create a project & generate API key](../Create%20a%20project%20&%20generate%20API%20key.md)

### Environment Variables

| Variable Name      | Type      | Description                                                                                                                                                                                |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| METIS_API_KEY      | `String`  | API Key to use                                                                                                                                                                             |
| METIS_ENVIRONMENT  | `String`  | Text used to identify the source that sends the instrumentation data.                                                                                                                      |
| METIS_DISABLED     | `Boolean` | If True Metis Instrumentation is fully disabled. We strongly advise to disable the instrumentation when in production to prevent sensitive data from leaving your organization's database. |
| METIS_SERVICE_NAME | `String`  | Gives ability to distinguish between services. Useful when working with Micro Services.                                                                                                    |

```

```
