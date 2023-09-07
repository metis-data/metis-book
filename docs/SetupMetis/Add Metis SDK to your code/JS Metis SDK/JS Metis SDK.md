# 🥷 Metis JS SDK

## **General**

Metis JS SDK allows you have insights about your SQL commands originated from your code.

Run your code as usual while Metis generates distributed traces and sends them to our servers for further analysis, then you will be able to view crucial insights about your queries.

## **Supported ORMs**

- [Native pg Client](https://www.npmjs.com/package/pg)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Typeorm](https://www.npmjs.com/package/typeorm)
- [Knex.js](https://www.npmjs.com/package/knex)
- [Bookshelf.js](https://www.npmjs.com/package/bookshelf)
- [Objection.js](https://www.npmjs.com/package/objection)
- [Mikro-orm](https://www.npmjs.com/package/mikro-orm)
- Some other ORM's based on PG library that we haven’t tested should also work.

:::tip
Check out our SDK example [projects](https://github.com/metis-data/metis-js-collectors/tree/main/examples) that covers most of the ORMs listed above
:::

## **How it works**

Metis JS SDK listens to SQL commands on your code, it receiving their execution plans from the PG server and combine them with their REST commands.

It sends those sets to Metis, which analyze the queries and combine all this information to create an E2E view of those traces and their analysis.

## **Prerequisite**

- A Metis account with a valid API key. [Create a project & generate API key](../../Create%20a%20project%20&%20generate%20API%20key.md)
- OpenTelemetry

## **Installation**

If you are using ESM continue to the ESM installation page [Metis JS SDK - With ESM](JS%20Metis%20SDK%20installation%20with%20ESM.md)

Run the following command to install the **SDK** and PG if it is not already installed:

```js
npm install --save pg @metis-data/pg-interceptor
```

Install Opentelemetry packages that are required:

```js
npm install --save @opentelemetry/api \
                   @opentelemetry/context-async-hooks \
                   @opentelemetry/instrumentation \
                   @opentelemetry/instrumentation-http \
                   @opentelemetry/resources \
                   @opentelemetry/sdk-trace-base \
                   @opentelemetry/semantic-conventions
```

### Setup tracer

:::note
In opentelemetry, tracing should be set before application bootstrap.
:::

Create `tracer` file and add the following code:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="js" label="JavaScript">

```js
// tracer.js
import opentelemetry from '@opentelemetry/api';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { BasicTracerProvider, BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { getMetisExporter, MetisHttpInstrumentation, MetisPgInstrumentation, getResource } from '@metis-data/pg-interceptor';
import { AsyncHooksContextManager } from '@opentelemetry/context-async-hooks';

let tracerProvider;
const connectionString = process.env.PG_CONNECTION_STRING;

export const startMetisInstrumentation = () => {
  tracerProvider = new BasicTracerProvider({
    resource: getResource(process.env.METIS_SERVICE_NAME, 'service-version'),
  });

  const metisExporter = getMetisExporter(process.env.METIS_API_KEY);

  tracerProvider.addSpanProcessor(new BatchSpanProcessor(metisExporter));

  if (process.env.OTEL_DEBUG) {
    tracerProvider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  }

  const contextManager = new AsyncHooksContextManager();

  contextManager.enable();
  opentelemetry.context.setGlobalContextManager(contextManager);

  tracerProvider.register();

  // Urls regex to exclude from instrumentation
  const excludeUrls = [/favicon.ico/];
  registerInstrumentations({
    instrumentations: [new MetisPgInstrumentation({ connectionString }), new MetisHttpInstrumentation(excludeUrls)],
  });
};
```

</TabItem>
<TabItem value="ts" label="Type Script">

```tsx
// tracer.ts
import opentelemetry from '@opentelemetry/api';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { BasicTracerProvider, BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { getMetisExporter, MetisHttpInstrumentation, MetisPgInstrumentation, getResource } from '@metis-data/pg-interceptor';
import { AsyncHooksContextManager } from '@opentelemetry/context-async-hooks';

let tracerProvider: BasicTracerProvider;
const connectionString = process.env.PG_CONNECTION_STRING;

export const startMetisInstrumentation = () => {
  tracerProvider = new BasicTracerProvider({
    resource: getResource(process.env.METIS_SERVICE_NAME, 'service-version'),
  });

  const metisExporter = getMetisExporter(process.env.METIS_API_KEY);

  tracerProvider.addSpanProcessor(new BatchSpanProcessor(metisExporter));

  if (process.env.OTEL_DEBUG) {
    tracerProvider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  }

  const contextManager = new AsyncHooksContextManager();

  contextManager.enable();
  opentelemetry.context.setGlobalContextManager(contextManager);

  tracerProvider.register();

  // Urls regex to exclude from instrumentation
  const excludeUrls = [/favicon.ico/];
  registerInstrumentations({
    instrumentations: [new MetisPgInstrumentation({ connectionString }), new MetisHttpInstrumentation(excludeUrls)],
  });
};
```

</TabItem>
</Tabs>

### Parameters

Edit the required parameter `connectionString` - A valid connection string is required: `postgres://user:password@host:port/database`

If for any reason (like dynamic address) the connection string is not available during the tracer setup, you can define it later with the following code:

```tsx
import { setPgConnection } from '@metis-data/pg-interceptor';

// When the connectionString available
setPgConnection(connectionString);
```

- `excludeUrls`- An array of URLs that you wish to exclude from being instrumented, in the code the `/favicon.ico/` will be ignored

### Usage

After creating the tracer it should be called from application root where the bootstrap happens:

```tsx
// main.ts
import { startMetisInstrumentation } from './tracer';
startMetisInstrumentation();

// imports...
// bootstrap()
```

Environment Variables

| Variable Name      | Type      | Description                                                                                                                                                                                |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| METIS_API_KEY      | `String`  | API Key to use.                                                                                                                                                                            |
| METIS_ENVIRONMENT  | `String`  | Text used to identify the source that sends the instrumentation data.                                                                                                                      |
| METIS_PLAN_MODE    | `String`  | Can be set to one of [none, actual, estimated] to choose which query plan to fetch, the default is actual.                                                                                 |
| METIS_DISABLED     | `Boolean` | If True Metis Instrumentation is fully disabled. We strongly advise to disable the instrumentation when in production to prevent sensitive data from leaving your organization's database. |
| METIS_SERVICE_NAME | `String`  | Gives ability to distinguish between services. Useful when working with Micro Services.                                                                                                    |
| OTEL_DEBUG         | `Boolean` | If True, console exporter is added to print incoming spans to console.                                                                                                                     |
