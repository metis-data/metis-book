---
sidebar_label: '📊 Monitoring'
sidebar_position: 3
---

# 📊 Going Beyond the Basic Metrics

## Monitor the Production Environment 

Think of a production database like a complex machine; many things can go wrong. Smart monitoring not only watches over the complex production database but also helps find the main reason when something goes wrong. By pointing directly to the root cause of an issue, it makes fixing problems much quicker. This means the time it takes to solve a problem (Time to Resolution) is minimized, helping keep the system running smoothly for users. Using Metis is like having a smart friend who helps keep everything running smoothly.

## Going Beyond the Basic Metrics

Most database monitoring tools keep an eye on the basics like CPU and database size. But Metis goes further. It looks at more details like how the database is configured, any changes in its structure, and even keeps track of each table's activity—what's being read and written. It also watches over queries and how they're being carried out. This extra information is like having a detective for your database, helping to solve complicated problems that basic tools might miss. Metis gives a fuller picture for administrators to keep everything running smoothly.

## From Observability to Insights

Moving from observability to insights means going beyond just seeing what's happening and understanding why. Analyzing collected data helps uncover deep insights and root causes. It allows us to provide strong recommendations with high confidence and suggest further improvements, such as changing the configuration or adding indexes. 

## DB Fleet Management
When managing a fleet of servers, each hosting one or more databases, pinpointing the root cause of issues can be challenging. Our monitoring system simplifies this by assigning health scores to both servers and databases, facilitating easy detection of problems. Additionally, we are working on integrating alert tools to provide timely notifications for a more proactive approach to issue resolution. 


## What do we monitor?

Here are some of the information the agent collects

### Server

- OS Metrics: CPU, free memory, IO throughput
- Database Server activity: reads, writes, rolled back transactions, cache hit ratio
- Database Size
- Configuration: current and recent
- Detailed Buffer Cache usage (coming soon)

### Databases

- DB activity:  reads, writes, rolled back transactions, cache hit ratio
- Detailed DB size: data, indexes

### Tables and Indexes

- Table Schema: columns, Primary Key, indexes
- Table activity
- Indexes activity
- Statistics last update dates
- Vacuum (coming soon)

### Queries

- Avg duration, number of calls
- Execution plan

The agent doesn’t monitor all the tables, only the top (largest) tables. In a similar way, it only monitors the top queries. 

