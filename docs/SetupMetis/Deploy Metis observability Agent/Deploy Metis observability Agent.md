# 🤖 Deploy Metis Agent

## Data Flow

**Step 1 - Configure Metis observability agent**

The Metis agent sends metadata to the Metis platform every X minutes. One Agent can monitor multiple Postgres servers and databases.

**Step 2 - Data Processing**

The backend processes the raw data into well-defined data sets. It also calculates insights to help focus on problems and how to solve them.

**Step 3 - View the data in the Observability Dashboard**

Open the web app to view the analyzed data. The dashboard provides useful information about: - The PG Server: performance and configuration - PG Databases: size, performance, and activity - Tables and indexes: size, scheme analysis, activity - Queries: statistics and performance analysis

## Metis agent - data sources

The Metis agent collects many Data Sets from 3 source types:

**SQL Queries:** the agent uses a connection string and a set of predefined SQL commands to collect Data Sets such as existing Databases, their size, DB activity, the schema of each DB, table size, index usage, and configuration... These Data Sets are collected from any Postgres server: AWS RDS, AWS Aurora, SQL on K8S, Google Cloud SQL for PostgreSQL, Azure Database for PostgreSQL etc.

**Performance Counters:** the agent also collects the main performance counters such as CPU, free memory, IO Throughput, and Avg Active Sessions. Current version support only AWS CloudWatch and Prometheus.

**Query Log:** The SQL commands (all or a sample of them) and their execution plan.

## Configuration Overview

When configuring the agent, you would need to give Metis the desired implementation of the Agent. meaning how you want to install the agent and where to send the data to.

**Agent’s Host:** Metis Agent can be deployed to Docker container deployed to [Amazon Elastic Container Service](https://aws.amazon.com/ecs/) or K8s.

**Monitored Postgres servers and databases:** A connection string to the PostgreSQL server the Metis agent should monitor.

**Monitored performance counters source:** Metis currently supports reading from CloudWatch or Postgres deployed on top of docker or K8s.

**Destination (Metis Platform):** The Metis agent sends the data to the Metis Platform using a Metis API key. You can also consume performance metrics of your database using our Prometheus exporter.

## Prerequisites

**Prepare Postgres to be monitored by installing PG extensions:**

- (Required)  [pg_stat_statements](https://www.postgresql.org/current/pgstatstatements.html) - the `pg_stat_statements` module provides a means for tracking the planning and execution statistics of all SQL statements executed by a server.

On RDS:

- (Required) [log_fdw](https://github.com/aws/postgresql-logfdw) - enable reads from the query log to analyze the queries and their execution plan. Follow the instructions below on how to configure it. more details can be found in [AWS documentation](https://github.com/aws/postgresql-logfdw).

On others:

- (Required) [pg_store_plans](https://ossc-db.github.io/pg_store_plans/) -  provides a means for tracking execution plan statistics of all SQL statements executed by a server.
- (Required) file_fdw - Enable reads from the query log to analyze the queries and their execution plan.

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

**RDS user permissions (on RDS)**

AWS RDS requires credentials and permissions

First, create a new user with `Access_Key` and `Secret_Key`.

To read the performance counters the AWS user used by the Metis agent must have the **[GetMetricStatistics](https:/.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_GetMetricStatistics.html)** policy.

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

## Configure Query Log (on RDS)

You should configure the Query Log to collect a sample of the queries and their execution plan. more information can be found on [Metis Slow Query Log](https://www.npmjs.com/package/@metis-data/slow-query-log).

| Parameter                          | Value                        | DB restart required |
| ---------------------------------- | ---------------------------- | ------------------- |
| session_preload_libraries          | auto_explain                 | Yes                 |
| logging_collector                  | ‘on’                         | Yes (locally)       |
| log_destination                    | ‘csvlog’                     | Yes (locally)       |
| log_filename                       | ‘postgresql.log.%Y-%m-%d-%H’ | Yes (locally)       |
| log_rotation_age                   | 60                           | Yes (locally)       |
| auto_explain.log_min_duration      | 10                           | No                  |
| auto_explain.log_format            | ‘json’                       | No                  |
| auto_explain.log_analyze           | True                         | No                  |
| auto_explain.log_buffers           | True                         | No                  |
| auto_explain.log_timing            | True                         | No                  |
| auto_explain.log_verbose           | True                         | No                  |
| auto_explain.log_nested_statements | True                         | No                  |
| log_statement                      | ‘mod’                        | No                  |
| log_min_duration_statement         | 10                           | No                  |
| compute_query_id                   | ‘on’                         | No                  |

:::tip
The query log might become large quickly in a busy environment. AWS RDS generates a Query Log file every hour (the user can't change that). The size of each log file **should not exceed 150MB**.

If the log files are larger than 150MB consider:

Increase `auto_explain.log_min_duration` and `log_min_duration_statement`

Sample only a percentage of the logs (by default it logs 100% of the queries that match the min duration).

:::

RDS setup using AWS CLI: If it is the first time of enabling Postgres logs on RDS, a new parameter group should be created with `logging_collector=on`.

After enabling slow query log in your RDS, the rest of Postgres variables can be set with AWS CLI:

```bash
aws rds modify-db-parameter-group \
  --db-parameter-group-name your-parameter-group-name \
  --parameters \
    "ParameterName=shared_preload_libraries,ParameterValue=auto_explain,ApplyMethod=pending-reboot" \
    "ParameterName=log_destination,ParameterValue=csvlog,ApplyMethod=immediate" \
    "ParameterName=log_filename,ParameterValue=postgresql.log.%Y-%m-%d-%H,ApplyMethod=immediate" \
    "ParameterName=log_rotation_age,ParameterValue=60,ApplyMethod=immediate" \
    "ParameterName=log_statement,ParameterValue=mod,ApplyMethod=immediate" \
    "ParameterName=log_min_duration_statement,ParameterValue=0,ApplyMethod=immediate" \
    "ParameterName=compute_query_id,ParameterValue=on,ApplyMethod=immediate" \
    "ParameterName=auto_explain.log_format,ParameterValue=json,ApplyMethod=immediate" \
    "ParameterName=auto_explain.log_min_duration,ParameterValue=0,ApplyMethod=immediate" \
    "ParameterName=auto_explain.log_analyze,ParameterValue=true,ApplyMethod=immediate" \
    "ParameterName=auto_explain.log_buffers,ParameterValue=true,ApplyMethod=immediate" \
    "ParameterName=auto_explain.log_timing,ParameterValue=true,ApplyMethod=immediate" \
    "ParameterName=auto_explain.log_verbose,ParameterValue=true,ApplyMethod=immediate" \
    "ParameterName=auto_explain.log_nested_statements,ParameterValue=true,ApplyMethod=immediate"

# reboot to apply shared_preload_libraries, this set will override an exists values
# so if another library is needed make sure to add it to the string command
aws rds reboot-db-instance --db-instance-identifier your-db-instance-id
```

## Deploy methods

[🐳 Docker](Docker.md)

[💠 AWS ECS](AWS%20ECS.md)

[⚙️ Using HELM Chart](Using%20HELM%20Chart.md)

**Integrations**

[🌀 Prometheus integration with Grafana](Prometheus%20integration%20with%20Grafana.md)
