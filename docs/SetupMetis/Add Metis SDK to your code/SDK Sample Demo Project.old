# 🖥️ SDK Sample Demo Project

:::tip
The sample demo project is a good way to quickly see the Metis SDK in action and what value it brings
This sample project works with SQLAlchemy + Flask
:::

### Usage overview

1. Download the sample code repository
2. Configure a connection to the PG Server. You can use a connection string to a sample cloud DB or spin up a Docker image, that we also provide.
3. Configure a Metis API Key.
4. Run the Flask Server locally.
5. Run a REST command called “run_demo”. This command generates a few traces
6. Open Metis Web App to review the traces, SQL commands, and insights.

### Step 1 - Open the code sample

Open the project’s GitHub Repository [here](https://github.com/metis-data/sdk-examples/tree/main/python/flask-sqlalchemy-example).

Download the Metis SDK for SQLAlcehmy from [PyPi](https://pypi.org/project/sqlalchemycollector/).

### Step 2 - Configure the Connection String

The server connects to a PG database called "flights". You can connect to the databases in one of the following options:

1. Using an existing PG server connecting using a connection string:

   ```bash
   postgresql://user1:password@srv1.eu-central-1.rds.amazonaws.com:5432/flights
   ```

2. Using Docker image. The image contains PG 15 with the Database.

   ```python
   postgresql://postgres:postgres@localhost:5432/flights
   ```

3. Download the DB yourself from [here](https://postgrespro.com/community/demodb).

In the `app.py` file edit the code to use a valid connection string

```python
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemycollector import setup, MetisInstrumentor, PlanCollectType
app = Flask(__name__)
with app.app_context():

    app.config['SQLALCHEMY_DATABASE_URI'] = <CONNECTION STRING HERE>
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db = SQLAlchemy(app)
    migrate = Migrate(app, db)
```

### Step 3 - Metis Instrumentation

The code uses simple instrumentation to configure: replace with edit the code to

`api_key` (Mandatory) - [🥽 Create a project & generate API key](../Create%20a%20project%20&%20generate%20API%20key.md)

`service_name` (Optional) - A metadata tag used to identify all the traces sent by this Flask Server.

`service_version` (Optional) - a metadata tag used for better control on the traces sent by each Flask server.

For example, it can help detect problems in the new version of the service "flights"

```py
instrumentation: MetisInstrumentor = setup('flights',
   api_key='Sc0123456789abcdefgABCDEFG',
   service_name='my demo project',
   service_version='1.1'
   )
instrumentation.instrument_app(app, db.get_engine())
```

### Step 4 - Run the Flask Server

Run the Flask server from the terminal with the command:

```bash
./env/bin/flask run
```

### Step 5 - Call the REST Methods

Open the browser with the IP provided by the terminal. By default it is `http://127.0.0.1:5000`.

Run the REST command `http://127.0.0.1:5000/run_demo`. It generates a few traces

### Step 6 - View the Traces in Metis Web App

Open the Recent Activity of the project. You must use the project that is mapped to the API key you provided in Step 3.
