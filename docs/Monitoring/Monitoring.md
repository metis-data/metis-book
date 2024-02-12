---
sidebar_label: '📊 Monitoring' 
sidebar_position: 3
---

# 📊 Going Beyond the Basic Metrics

## Monitor the Production Environment 

Think of a production database as a complex machine where many things can go wrong. Smart monitoring not only watches over the complex production database but also helps find the main reason when something goes wrong. By pointing directly to the root cause of an issue, it makes fixing problems much quicker. This means the time it takes to solve a problem (Time to Resolution, TTR) is minimized, helping keep the system running smoothly for users. Using Metis is like having a smart friend who takes care of your databases.

## Going Beyond the Basic Metrics

Most database monitoring tools keep an eye on the basics like CPU and database size. Metis goes further. It looks at more details like how the database is configured, and any changes in its structure, and even keeps track of each table's activity—what's being read and written. It also watches over queries and how they're being carried out. This extra information is like having a detective for your database, helping to solve complicated problems that basic tools might miss. Metis gives a fuller picture for administrators to keep everything running smoothly.

## From Observability to Insights

Moving from observability to insights means going beyond just seeing what's happening and understanding why. Analyzing collected data helps uncover deep insights and root causes. It allows us to provide strong recommendations with high confidence and suggest further improvements, such as changing the configuration or adding indexes. 

## Database Fleet Management
When managing a fleet of servers, each hosting one or more databases, pinpointing the root cause of issues can be challenging. Metis simplifies this by assigning health scores to both servers and databases, facilitating easy detection of problems. Additionally, we are working on integrating alert tools to provide timely notifications for a more proactive approach to issue resolution. 

## What Do We Monitor?

Here are some of the information that Metis Metadata Collector (MMC) collects:

### Server

- Infrastructure Metrics: CPU, free memory, IO throughput
- Database Server Activity: reads, writes, rolled back transactions, cache hit ratio
- Database Size
- Configuration: current and recent

### Databases

- Database Activity: reads, writes, rolled back transactions, cache hit ratio
- Details about the Size of data and indexes

### Tables and Indexes

- Table Schema: columns, keys, indexes
- Table Activity
- Indexes Activity
- Statistics Updates
- Vacuum

### Queries

- Duration, number of calls
- Execution plans

Metis Metadata Collector doesn’t monitor all the tables, only the top (largest) tables. In a similar way, it only monitors the top queries. 
