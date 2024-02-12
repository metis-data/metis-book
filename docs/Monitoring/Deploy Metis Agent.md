--- 
sidebar_position: 1
---
# 🤖 Deploying Metis Metadata Collector

## General

Metis Metadata Collector (MMC) collects information from your hosts and sends it to the platform. Metis then analyzes and extracts valuable insights, and detects issues around your databases.

You can use the **Monitoring** page to see the collected information about your hosts, databases, and metrics.

## Deployment process
 
You can use the wizard to deploy the Metis Metadata Collector instance to your hosts. To learn how to use the wizard, watch this [video](https://youtu.be/K8yMuhfBGfU) or follow the steps below:

1. **Vendor & Environment Selection**
2. **Host Connection Information**
3. **Configurations**
4. **Deployment**

### **Vendor & Environment Selection**

Go to the page [Monitoring](https://app.metisdata.io/monitoring). Click on the button **Deploy** to open the configuration Wizard.

![Untitled](Quickstart/New_PG_Wizard_Select_vendor.png)

Select your hosting infrastructure and click **Next**.

The vendor type is being used to collect more information about your databases, features, and metrics (as these details depend on the vendor).

:::tip
If you are planning to add multiple hosts make sure they are all on the same vendor and environment otherwise you need to complete the flow separately
:::

### Create a Monitoring User And Give Permissions

Metis Metadata Collector must have permission to query the system catalog and read the database schema.

The best practice is to create a new user that will be used for monitoring only and will have minimum privileges.

#### PostgreSQL

```sql
-- Create a new user called "metis". Do not forget to change the password.
CREATE USER metis WITH PASSWORD 'your_password';

-- Grant the permission "pg_monitor" to the user
GRANT pg_monitor TO metis;

--Grant access to EVERY database the Metis agent should monitor.
GRANT CONNECT ON DATABASE <DATABASE NAME> TO metis;
```

### Configuring Database Server

Metis Metadata Collector uses internal metrics of your database server to collect data. Some of them are available on demand and we need to enable them with built-in extensions.

#### PostgreSQL

```sql
-- Enable extension in every database that you want to monitor
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

### Host Connection Information

![deployment 2.png](Deploy%20Metis%20Agent/dep_2.png)

Enter a connection string to connect to your databases. The connection string differs between technologies.

Metis will try to connect to all databases in a given server.

#### PostgreSQL

We use [Prisma library](https://www.prisma.io/docs/orm/reference/connection-urls#postgresql) to connect to the server:

```
postgresql://USERNAME:PASSWORD@HOSTNAME:PORT
```

You can disable TLS with the following connection string:

```
postgresql://USERNAME:PASSWORD@HOSTNAME:PORT/?sslmode=disable
```

Consult the documentation if you need to use additional options.

### Vendor Metrics

![deployment 2.png](Deploy%20Metis%20Agent/dep_2.png)

Metis can extract information from cloud providers.

#### AWS

Metis collects data from AWS CloudWatch, in order to do that enter the following:

- Instance ID - The DB identifier in AWS
- AWS region - The host’s region on AWS
- Permission method for AWS - there are two options:
  1. Assume role - provide ARN
  2. Access key - provide access key and secret access key

**RDS user permissions**

AWS RDS requires credentials and permissions

First, create a new user with `Access_Key` and `Secret_Key`.

To read the performance counters the AWS user used by Metis Metadata Collector must have the [GetMetricStatistics](https://www.docs.metisdata.io/.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_GetMetricStatistics.html) policy.

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

### Deployment

![deployment 3.png](Deploy%20Metis%20Agent/dep_3.png)

Choose your deployment method. We currently provide scripts for Docker and Helm. The scripts are ready to be used with Bash. You may need to adjust syntax slightly if you want to use them in different shells.

Copy the command and run it on your host’s environment.

## More details about Metis Metadata Collector and how it works

This section explains what Metis Metadata Collector does.

### Data Flow

#### Step 1 - Data Extraction

Metis Metadata Collector captures the following:

- Statistics about queries - every minute
- Live queries - every second
- Schemas - every day

Metis Metadata Collector then sends the data to Metis.

One MMC instance can monitor multiple servers and databases.

##### Metis agent - data sources

The Metis agent collects many data sets from the following sources:

Database objects: Metis Metadata Collector uses a connection string and a set of predefined SQL commands to collect data sets such as existing databases, their size, database activity, the schema of each database, table size, index usage, and configuration. These Data Sets are collected from any database server: AWS RDS, AWS Aurora, SQL on K8S, Google Cloud SQL for PostgreSQL, Azure Database for PostgreSQL, etc.

Performance Counters: Metis Metadata Collector also collects the main performance counters such as CPU, free memory, IO Throughput, and Avg Active Sessions. The current version supports only AWS CloudWatch and Prometheus.

Queries: The SQL commands (all or a sample of them) and their execution plans.

##### Configuration Overview

When configuring Metis Metadata Collector, you need to specify how you want to install and configure the observability.

Agent’s Host: Metis Metadata Collector is deployed as a Docker container. You can use it as it is, or deploy it to [Amazon Elastic Container Service](https://aws.amazon.com/ecs/), Kubernetes, or similar infrastructures.

Monitored Postgres servers and databases: A connection string to the database server you want to monitor.

Monitored performance counters source: Metis currently supports reading from CloudWatch or Postgres deployed on top of Docker or Kubernetes.

Destination: Metis Metadata Collector sends the data to Metis using an API key. You can also consume the performance metrics of your database using our Prometheus exporter.

#### Step 2 - Data Processing

The backend processes the raw data into well-defined data sets. It also calculates insights to help focus on problems and how to solve them.

#### Step 3 - Data Presentation

Open the web app to view the analyzed data. The dashboard provides useful information about: - The PG Server: performance and configuration - PG Databases: size, performance, and activity - Tables and indexes: size, scheme analysis, activity - Queries: statistics and performance analysis



