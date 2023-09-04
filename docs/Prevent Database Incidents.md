---
sidebar_label: '🚨 Prevent Database Incidents'
sidebar_position: 4
---

# Prevent Database Incidents

## **BEFORE the deployment:**

Metis let you to see the SQL commands running in your environments, get insights about the performance and potential errors, and understand if it’s safe to deploy changes to production.

You will be able to see SQL commands running on your developer environment:

![Untitled](Quickstart/Untitled%203.png)

You will get insights about the performance and potential errors:

![Untitled](Quickstart/Untitled%204.png)

You will be able to understand the query details and see how it works behind the scenes:

![Untitled](Quickstart/Untitled%205.png)

Let’s start by integrating your application with Metis.

### How it works

In order to provide you with all the details, we need to do the following:

1. Capture signals about what network API your application exposes and how it’s being called;
2. Capture execution plans of the SQL queries your application sends to the database;
3. Deliver the execution plans to the Metis platform.

### Capture signals about your network API

To capture the signals about the network API your application exposes (point one from the above), we provide an SDK that integrates with your [Open Telemetry](https://opentelemetry.io/) configuration and emits [traces](https://opentelemetry.io/concepts/signals/traces/) to the Metis platform. These traces capture the details of the network requests your application processes, and SQL queries your application sends to the database. We do not extract any confidential data nor personal information. We only capture the metadata about the latency, executed query, execution plan, and metrics from the database.

**Open Telemetry**

Open Telemetry is common nowadays. Just like we have a logging library integrated with our frameworks, libraries, and business code, the telemetry is now available out of the box. Your web framework or database driver is most likely already integrated with it. Therefore, we don’t add anything new in terms of the dependencies. We only configure a new [Exporter](https://opentelemetry.io/instrumentation/js/exporters/) for the Open Telemetry signals that will deliver the signals to Metis platform. It’s like adding a new log file to your application.

### Capture execution plans of the SQL queries

To capture the execution plans of the SQL queries your application sends to the database (point two from the above), we use the [EXPLAIN](https://www.postgresql.org/current/sql-explain.html) command. The command takes your query and emits an execution plan that describes all the physical operations the database server needs to execute. We can run the EXPLAIN command in one of the many ways:

- Instrument your application code with our SDK to send the EXPLAIN query whenever your application sends a regular SQL query;
- Use [pg_store_plans](https://ossc-db.github.io/pg_store_plans/) extension directly in the database to automatically store the execution plans for each query;
- Use [auto_explain](https://www.postgresql.org/current/auto-explain.html) extension directly in the database to automatically explain the queries and store the execution plans in the logs.

### Deliver the execution plans to the Metis platform

To deliver the execution plans to the Metis platform (point three from the above) we again have a number of ways, depending on how we obtained the execution plan. If we instrumented the application code with our SDK, then the SDK will deliver the plans automatically. If we used one of the extensions for the database, then we need to use the Metis Agent (**TODO LINK**) to extract the plans from the logs by using either [file_fdw](https://www.postgresql.org/current/file-fdw.html) extension or [log_fdw](https://github.com/aws/postgresql-logfdw) extension.

Once we have all the signals delivered to the platform, everything will work automatically.

## Integrating Metis

To do that, follow the documentation for the technology stack you have in the [Setup Metis](category/-setup-metis) section. The steps you need to take come down to:

- Add Open Telemetry dependencies if you don’t have them in your project already;
- Add new Exporter to Open Telemetry to capture signals about REST requests (using our SDK);
- Get execution plans for the SQL queries (using our SDK or by configuring your database, depending on the technology you use);
- Deliver execution plans to Metis (using our SDK or by running Metis Agent, depending on the technology you use).

<aside>
💡 You can also see **[How To Seamlessly Integrate Sequelize with Node.js and JavaScript for Database Monitoring](https://www.metisdata.io/blog/how-to-seamlessly-integrate-sequelize-with-node-js-and-javascript-for-database-monitoring)** blog post taking you step by step through the integration of Sequelize ORM library with Metis platform.

</aside>

Once you do that, you will see **_Recent Activity_** card in your main project page:

![Untitled](Quickstart/Untitled%206.png)

Once you click on it, you will see the list of your endpoints with all the executions captured by Metis:

![Untitled](Quickstart/Untitled%207.png)

You can see the HTTP code returned by the network call (1), the duration (2), and the number of insights with their severities (3). Once you click on any of the calls, you will see the insights page:

## Insights page

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3AUILbgbmsA?si=P9U3xEFH3ckkn1CJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</center>

![Untitled](Quickstart/Untitled%208.png)

The main page of the call shows the following parts (see the screenshot above):

1. List of all spans and queries sent within this network call;
2. Tabs showing details of the SQL query;
3. List of insights for the SQL query;
4. Details of a particular insight;
5. Impact of the given insight;
6. Instructions how improve the query.

You can now examine the query and get the actionable results. If you see critical insights, then it is most likely not safe to deploy these changes to production.

If you want to see the query statement, then click on the **SQL** tab:

![Screenshot 2023-08-29 at 16.36.53.png](Quickstart/Screenshot_2023-08-29_at_16.36.53.png)

You can see the query text and how many rows were filtered along the way. You can also see the visualization of the plan by clicking on the **Query Tale**:

![Untitled](Quickstart/Untitled%209.png)

This shows you the order and types operations, how many rows were passed between the stages, and other details about the performance. You can click on the **Tables** tab to see the tables included in the query:

![Untitled](Quickstart/Untitled%2010.png)

This shows the tables, number of extracted rows, which indexes were used, and other metrics. You can also get the raw execution plan by clicking on **Execution Plan**:

![Untitled](Quickstart/Untitled%2011.png)

This way you can learn all the details about the query, reason about its performance, see how to improve it, and apply corrective actions.

# DURING **the deployment:**

At the end of this section you’ll be able to see the SQL commands running in your CI/CD pipeline, get insights about the schema migrations, and understand if it’s safe to deploy changes to production.

You’ll get the list of performance insights and schema migration insights for each pull request:

![Untitled](Quickstart/Untitled%2012.png)

You’ll also get the insights for the SQL migrations:

![Untitled](Quickstart/Untitled%2013.png)

Each migration will be automatically analyzed and details will be provided:

![Untitled](Quickstart/Untitled%2014.png)

### How it works

Metis can analyze changes in your pull request in the CI/CD pipeline the same way as with queries running in your local environment. To do that, we need to do the following:

1. Submit code changes with schema migrations;
2. Execute end-to-end tests in the CI/CD pipeline;
3. Capture signals from the execution in the CI/CD pipeline;
4. Analyze the schema migrations with Metis and correlate the execution with a particular pull request.

Points 1 and 2 are outside of Metis. You need to configure them **\*\***\*\*\***\*\***the regular way**\*\***\*\*\***\*\*** depending on your CI/CD platform. For instance, you can use [GitHub Actions.](https://github.com/features/actions)

To achieve point 3, you need to do the same things as in the previous section **Integrating Metis.** Depending on your technology stack, you may need to use the Metis Agent.

To achieve point 4, follow [**Add** Metis’s Git actions to your repository ](/category/add-metiss-git-actions-to-your-repository)

### GitHub Actions Integration with Metis

Configure your CI/CD actions the regular way. Create new token in GitHub to be used with Action: go to [GitHub Settings](https://github.com/settings/tokens), generate new token (classic), and assign permissions to workflow:

![Untitled](Quickstart/Untitled%2015.png)

![Untitled](Quickstart/Untitled%2016.png)

Configure GitHub Action variables and secrets in your repository to include the token and the Metis API key:

![Untitled](Quickstart/Untitled%2017.png)

![Untitled](Quickstart/Untitled%2018.png)

Next, run [Metis Test Action](https://github.com/marketplace/actions/metis-test-suite) in your CI/CD:

![Untitled](Quickstart/Untitled%2019.png)

Similarly, run the [action to analyze schema migrations](https://github.com/marketplace/actions/analyze-migrations):

![Untitled](Quickstart/Untitled%2020.png)

Once you submit a pull request, you should get comments from Metis:

![Untitled](Quickstart/Untitled%2021.png)

You can also go to the Metis project page and see the list of pull requests:

![Untitled](Quickstart/Untitled%2012.png)

You can now dive deep into each migration or test and see how it performed.
