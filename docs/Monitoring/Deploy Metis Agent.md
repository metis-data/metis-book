--- 
sidebar_position: 1
---
# 🤖 Deploy Metis Agent

# Agent deployment flow

### General

Metis agent collect information from your hosts and send it to Metis to analyze and extract valuable insights and detect issues about your databases.

You can view your hosts and databases information and metrics from the Monitoring section in the webapp.

In addition, Metis Projects are representation of your team’s dev projects with DB issues and insights digested in such a way your dev team can consume and make use of.

## Deployment process
 
Metis has created a fast and simple wizard to deploy a new agent to your hosts. To learn how to use the wizard, watch this [video](https://youtu.be/K8yMuhfBGfU) or follow the steps below.
It has 4 steps

1. **Vendor & Environment Selection**
2. **Host Connection Information**
3. **Configurations**
4. **Deployment**

### **Vendor & Environment Selection**

![deployment 1.png](Deploy%20Metis%20Agent/dep_1.png)

Selecting your hosts’ vendor and their environment (production/development)

The vendor type is being used to collect more information about your DBs, features and metrics support may very between vendors.

:::tip
If you are planing to add multiple hosts make sure they are all on the same vendor an environment otherwise you need to complete the flow separately
:::

Selecting you host’s environment will be used to differentiate your DB’s enviornments in your projects.

## Create a monitoring user

The Metis agent must have permission to query the system catalog and read the DB schema

The best practice is creating a new user, just for the monitoring, and granting it the minimum privileges.

```bash
-- Create a new user called "metis". Do not forget to change the password.
CREATE USER metis WITH PASSWORD 'your_password';

-- Grant the permission "pg_monitor" to the user
GRANT pg_monitor TO metis;

--Grant access to EVERY database the Metis agent should monitor.
GRANT CONNECT ON DATABASE <DATABASE NAME> TO metis;

```

### **Host Connection Information**

![deployment 2.png](Deploy%20Metis%20Agent/dep_2.png)

Enter a connection string to connect to your host’s Postgress DBs.
The connection string’s format is: `postgresql://postgres:password@rds_name:port`

**On AWS:**

Metis collects data from AWS CloudWatch, in order to do that enter the following:

- Instance ID - The DB identifier in AWS
- AWS region - The host’s region on AWS
- Permission method for AWS - there are two options:
  1. Assume role - provide ARN
  2. Access key - provide access key and secret access key

**RDS user permissions**

AWS RDS requires credentials and permissions

First, create a new user with `Access_Key` and `Secret_Key`.

To read the performance counters the AWS user used by the Metis agent must have the **[GetMetricStatistics](https://www.docs.metisdata.io/.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_GetMetricStatistics.html)** policy.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds:Describe*",
        "rds:List*",
        "tag:GetResources",
        "cloudwatch:ListTagsForResource",
        "cloudwatch:GetMetricStatistics",
        "cloudwatch:GetMetricData",
        "cloudwatch:ListMetrics"
      ],
      "Resource": "*"
    }
  ]
}
```

### **Configurations**

**Prepare Postgres to be monitored by installing PG extensions - required on each data base**

- (Required) [pg_stat_statements](https://www.postgresql.org/current/pgstatstatements.html) - the `pg_stat_statements` module provides a means for tracking the planning and execution statistics of all SQL statements executed by a server.
  In every database run the following:
      `CREATE EXTENSION IF NOT EXISTS pg_stat_statements;`

### Deploy

![deployment 3.png](Deploy%20Metis%20Agent/dep_3.png)

Choose your deployment method Docker or Helm

Copy the command and run on your host’s environment

# More details about Metis Agent and how it works

## Data Flow

**Step 1 - Configure Metis observability agent**

The Metis agent sends metadata to the Metis platform every X minutes. One Agent can monitor multiple Postgres servers and databases.

**Step 2 - Data Processing**

The backend processes the raw data into well-defined data sets. It also calculates insights to help focus on problems and how to solve them.

**Step 3 - View the data in the Observability Dashboard**

Open the web app to view the analyzed data. The dashboard provides useful information about: - The PG Server: performance and configuration - PG Databases: size, performance, and activity - Tables and indexes: size, scheme analysis, activity - Queries: statistics and performance analysis

## Metis agent - data sources

The Metis agent collects many Data Sets from 3 source types:

**SQL Queries:** the agent uses a connection string and a set of predefined SQL commands to collect Data Sets such as existing Databases, their size, DB activity, the schema of each DB, table size, index usage, and configuration...
These Data Sets are collected from any Postgres server: AWS RDS, AWS Aurora, SQL on K8S, Google Cloud SQL for PostgreSQL, Azure Database for PostgreSQL etc.

**Performance Counters:** the agent also collects the main performance counters such as CPU, free memory, IO Throughput, and Avg Active Sessions. Current version support only AWS CloudWatch and Prometheus.

**Query Log:** The SQL commands (all or a sample of them) and their execution plan.

## Configuration Overview

When configuring the agent, you would need to give Metis the desired implementation of the Agent. meaning how you want to install the agent and where to send the data to.

**Agent’s Host:** Metis Agent can be deployed to Docker container deployed to [Amazon Elastic Container Service](https://aws.amazon.com/ecs/) or K8s.

**Monitored Postgres servers and databases:** A connection string to the PostgreSQL server the Metis agent should monitor.

**Monitored performance counters source:** Metis currently supports reading from CloudWatch or Postgres deployed on top of docker or K8s.

**Destination (Metis Platform):** The Metis agent sends the data to the Metis Platform using a Metis API key. You can also consume performance metrics of your database using our Prometheus exporter.
