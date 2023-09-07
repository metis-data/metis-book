# JS Metis SDK installation with ESM

The ECMAScript modules (in short ES modules) is a JavaScript modules format which is the official standard format to package JavaScript code for reuse. The ES modules format generally offers an easier route to writing isomorphic JavaScript, which can run in the browser or on a server.

**Installation:**

Clone the [Metis JS SDK](https://docs.metisdata.io/metis/getting-started/sdk-integration/node.js-pg) for Github

For Node.JS <= 12.2.0

```jsx
npm install @metis-data/pg-interceptor create-require cross-dirname -S
```

otherwise

```jsx
npm install @metis-data/pg-interceptor cross-dirname -S
```

**Configuration:**

Create a `tracer.js` file

```jsx
import { createRequire } from 'module';
import { getFilename } from 'cross-dirname';
const _require = createRequire(getFilename());

const opentelemetry = _require('@opentelemetry/api');
const { registerInstrumentations } = _require('@opentelemetry/instrumentation');
const { Resource } = _require('@opentelemetry/resources');
const { BasicTracerProvider, BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor } = _require('@opentelemetry/sdk-trace-base');
const { SemanticResourceAttributes } = _require('@opentelemetry/semantic-conventions');
const { getMetisExporter, MetisHttpInstrumentation, MetisPgInstrumentation } = _require('@metis-data/pg-interceptor');
const { AsyncHooksContextManager } = _require('@opentelemetry/context-async-hooks');

let tracerProvider;
const connectionString = process.env.PG_CONNECTION_STRING;

export const startMetisInstrumentation = () => {
  tracerProvider = new BasicTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: process.env.METIS_SERVICE_NAME,
      [SemanticResourceAttributes.SERVICE_VERSION]: 'service-version',
    }),
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

startMetisInstrumentation();
java;
```

Add the following to your `.env` file (we need to add parameters here)

```jsx
PG_CONNECTION_STRING=
METIS_API_KEY=
METIS_SERVICE_NAME=
```

**Usage:**

Change the `start` script on your `package.json` file

```jsx
// path to the tracer file, path to your entry point

node --experimental-loader tracer.js index.js
```
