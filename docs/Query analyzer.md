---
sidebar_label: '🪄 Query Analyzer'
sidebar_position: 6
---

# Query Analyzer

With the query analyzer module you can analyze and get insights about your queries without integrating Metis in your application.

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/Hlah3Gvjf_E?si=GKXX535UjOwswY7t" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></center>

The query analyzer requires only a query and its executions plan in order to provide valuable insight about it.

The query analyzer uses the same Metis engine to get comprehensive information about a given query.

:::tip
Login is not required for using the Query Analyzer

:::

### How to use it

1. Go to the query analyzer [page](https://demo.metisdata.io/query-analysis) - login is not required
2. Paste your query in the text box on the left side of the page
3. Paste the queries execution plan in the text box on the right side of the page
4. Click on “Analyze”

![Screenshot 2023-08-29 at 18.42.12.png](Query%20analyzer/analyzer.png)

### How to create an execution plan

Execution plan is the instruction set for the DB on how to execute a given query, and it holds a valuable information on how the BD will behave and what the impact on the DB will be.

In order to generate an execution plan from a query, you need to run your query with the EXPLAIN command before the query.

Add the following line of code before running the query:

```sql
EXPLAIN (ANALYZE, COSTS, VERBOSE, BUFFERS, TIMING, FORMAT JSON)
```

For example:

```sql
EXPLAIN (ANALYZE, COSTS, VERBOSE, BUFFERS, TIMING, FORMAT JSON)
select *
from postgres_air.flight
where flight_id = 108340
```

The result will be an execution plan, in a JSON format which we will copy to the Query analyzer.

After inserting a query and its execution plan the Query analyzer will look like this:

![Screenshot 2023-08-29 at 18.50.57.png](Query%20analyzer/analyzer_full.png)

After clicking on “Analyze” you will get an analyzed query result with insights

![Screenshot 2023-08-29 at 18.53.27.png](Query%20analyzer/Screenshot_2023-08-29_at_18.53.27.png)
