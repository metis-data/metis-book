---
sidebar_label: '📊 Monitor & troubleshoot your databases'
sidebar_position: 5
---

# 📊 Monitor & troubleshoot your databases

## Monitor & troubleshoot - AFTER deployment

At the end of this section you will be able to:

- Analyze your database host metrics;
- Analyze your database metrics;
- Get insights for the schema configuration;
- See the extensions and runtime configuration insights;
- See insights for queries executed in your database;
- Find unused indexes.

### How it works

Metis integrates with your database and extracts metrics, logs, and runtime configuration. All that is done by the [Metis Agent](https://github.com/metis-data/metadata-collector/tree/main). It’s a tiny Docker container that you can run alongside your database to get all the benefits. You can run it locally (on-premise) or in the cloud.

Metis Agent is open-source and you can verify how it works. It spins up periodic tasks (CRON-like) that connect to your database, extract logs, statistics, metrics, and then posts them to the Metis platform. No confidential information is extracted.

### Integrate Metis Agent

To run Metis agent, follow the [🤖 Deploy Metis Agent](/docs/SetupMetis/Deploy%20Metis%20observability%20Agent/Deploy%20Metis%20observability%20Agent.md) guide. Once you do that, you should see the list of the servers monitored by the Metis Agent:

![Untitled](Quickstart/Untitled%2022.png)

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/kTHiobuZGo0?si=6WapRtczr8Fn2PGq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</center>

Once you click on the server, you get the **Server Observability Dashboard**.

## Server Observability Dashboard

![Untitled](Quickstart/Untitled%2023.png)

The dashboard shows multiple charts: CPU (1), memory (2), throughput (3), active sessions (4), and connections (5). You can also see insights about extensions (6), configuration (7), and details for a specific database.

You can zoom in each chart by clicking on it. You can also modify the time range by dragging the slider:

![Untitled](Quickstart/Untitled%2024.png)

Once you click on the extensions, you get this:

![Untitled](Quickstart/Untitled%2025.png)

You can see the list of installed extensions and insights for each one of them requiring attention. When you click on the extension, you get:

![Untitled](Quickstart/Untitled%2026.png)

You can see the list of insights (1), the impact of each insight (2), and the instruction how to fix that (3).

When you go to configuration, you get a very similar list of configuration keys and insights:

![Untitled](Quickstart/Untitled%2027.png)

Each insight is presented in a similar manner:

![Untitled](Quickstart/Untitled%2028.png)

When you go to a database view, you get the database-oriented dashboard:

![Untitled](Quickstart/Untitled%2029.png)

You can see the transactions (1), rows (2), temporary files (3), cache hits (4). You can also examine table sizes (5), schema insights (6), indexes (7), and queries (8).

After clicking on the **Table Sizes**, you can see the details of each table:

![Untitled](Quickstart/Untitled%2030.png)

Similarly, you can check your schemas:

![Untitled](Quickstart/Untitled%2031.png)

Each schema has insights. Once you click on it, you go to a screen that shows the details of the impact and how to fix it:

![Untitled](Quickstart/Untitled%2032.png)

When you go to indexes, you can see the following:

![Untitled](Quickstart/Untitled%2033.png)

You can see the index name and other details (1), automated insights (2), and the history of the usage (3). You can click on the insights to get more details:

![Untitled](Quickstart/Untitled%2034.png)

You can also go to the **Queries:**

![Untitled](Quickstart/Untitled%2035.png)

The screen shows the query texts (1), number of calls (2), average duration (3), and the insights for each query. Once you click on a query, you get details:

![Untitled](Quickstart/Untitled%2036.png)

You can see the query text (1), the average duration over time (2), and the number of hourly calls (3). You can also click on **Insights** to get automated recommendations:

![Untitled](Quickstart/Untitled%2037.png)

#
