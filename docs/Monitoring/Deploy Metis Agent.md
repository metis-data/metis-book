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

![Untitled](../Quickstart/New_PG_Wizard_Select_vendor.png)

Select your hosting infrastructure and click **Next**.

The vendor type is being used to collect more information about your databases, features, and metrics (as these details depend on the vendor).

:::tip
If you are planning to add multiple hosts make sure they are all on the same vendor and environment otherwise you need to complete the flow separately
:::

### Create a Monitoring User And Grant Permissions

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

-- Instead of manually granting the CONNECT permissions to every database in case of a large number of databases, utilize the following SQL query to generate SQL commands for all databases.
SELECT STRING_AGG(cmd, ' ') AS concatenated_string
FROM (
select 'GRANT CONNECT ON database ' || datname  ||  ' TO metis; ' as cmd
from pg_database 
)as T1;
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

### Vendor Metrics (Recommended)

![deployment 2.png](Deploy%20Metis%20Agent/dep_2.png)

Certain metadata, like host metrics, cannot be fetched via SQL queries. To obtain this data, the MMC agent needs to invoke services like AWS CloudWatch.

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
        "cloudwatch:ListMetrics",
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceTypes"
      ],
      "Resource": "*"
    }
  ]
}
```
**Selecting the monitored database**
By default the agent monitors the largest 100 databases. To select specific databases, add the parameters ```"monitored_databases":["db1", "db2", "db3"]```. The wizard doesn't support this option, therefore it should be done manually. 
For example, a full Docker Run command, with specific 3 monitored databases. 
```[{ "uri":"postgresql://monitored:pass123@mysql-for-test.abcdefg.eu-central-1.rds.amazonaws.com:5432", "host_vendor":"aws","monitored_databases":["employees", "db2", "db3"] ,"vendor_metadata":{ "region":"eu-central-1", "instanceId":"pg-for-test", "accessKeyId":"AK1234", "secretAccessKey":"KO1234"}}]```

If you want to create a list of the monitored DB use this python script to generate a string of the db names. 
``` import psycopg2

conn_params = {
    "host": "host-name",
    "user": "postgres",
    "password": "password",
    "port": "5432"
}
conn = psycopg2.connect(**conn_params)
cur = conn.cursor()
cur.execute("""
    SELECT ARRAY(SELECT  '"' || datname || '"' as name
    FROM pg_database 
    WHERE datistemplate = false)
""")
db_names_array = cur.fetchone()[0]
cur.close()
conn.close()
db_names_string = ','.join(db_names_array)
print(db_names_string)
```

### Deployment

![deployment 3.png](Deploy%20Metis%20Agent/dep_3.png)

Choose your deployment method. We currently provide scripts for Docker and Helm. The scripts are ready to be used with Bash. You may need to adjust syntax slightly if you want to use them in different shells.

Copy the command and run it on your host’s environment.
