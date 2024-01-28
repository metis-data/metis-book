---
sidebar_label: '🚨 Preventing Schema Migration Problems'
sidebar_position: 6
---

# 🚨 Prevent Schema Migration Related Problems
The term "Schema Migration" is used to describe the act of altering the schema of the database. This involves making changes to the organization of tables, relationships, constraints, and other elements within the database to align with the evolving requirements of the application. The goal is to maintain consistency between the application's logic and the database structure, ensuring that both components work harmoniously.

Changing the schema might cause one of the following problems:

- Data Loss: accidentally delete a table or “just” a column.
- Application Errors - The name of an object (table, column, function) had changed, therefore the application can’t read from or write to it.
- Performance problems - an index was deleted.
- Data Quality - Removing a constraint
- Security risks - changes in the security roles or Row Level Security (RLS)


## Production Enrichment

Production enrichment is about using real-time data from the live server to make smarter decisions when managing databases. For example, before deleting an index or table, we check its usage in the last 7 days to understand its importance. When creating a new index, we look at the table size in production to estimate how long it might take. This helps us avoid disruptions and ensures changes align with how the database is actually used.

## Workflow

**Step 1** - Configure a Metis GitHub Action to review the schema migration SQL Commands (Data Definition). 

**Step 2** - Run the CI/CD flow as usual, now with the new step. The SQL commands are sent for analysis and production enrichment

**Step 3** - View the results in the web app


