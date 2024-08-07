---
sidebar_position: 5
---

# Deploying the Agent
Once all the necessary prerequisites are completed, you're ready to deploy the MMC Agent.

:::tip
⚠️ The agent should use at least 1 CPU and 2GB Memory.
:::

The MMC Agent can be deployed using a Docker Run or a HELM Chart. To generate the deployment script, either follow the instruction below, or use a Deployment Wizard. 

## Deployment Wizard

Go the the [monitoring](https://app.metisdata.io/monitoring) page and click on “Add”. The wizard guides you which configuration parameters it expects. 

The wizard also generates a Metis API Key automatically. 

## Generate a Metis API Key

The wizard generates the METIS_API_KEY automatically. If you don’t use the wizard, then you need an API Key by creating a new Project in the [projects](https://app.metisdata.io/projects) page or copy the API Key of an existing project.   

## Deployment Script - Docker Run

The wizard eventually creates a Docker Run. 

**Example 1. A simple deployment.** The agent **m**onitors a single Postgres Server. The agent will monitor up to 100 databases (default). 

```bash
docker run -d --name metis-md-collector \
-e API_KEY="API_KEY_GENERATED_BY_THE_WIZARD" \
-e CONNECTION_STRING='[{ "uri":"postgresql://metis:your_password@host_name.eu-central-1.rds.amazonaws.com:5432"}]' \
public.ecr.aws/o2c0x5x8/mmc:latest
```

**Example 2. Monitoring the CloudWatch metrics** using AWS Access Key and Secret Access Key 

```bash
docker run -d --name metis-md-collector \
  -e API_KEY="METIS_API_KEY" \
  -e CONNECTION_STRING='[{ "uri":"postgresql://metis:your_password@host_name.eu-central-1.rds.amazonaws.com:5432", \
  "host_vendor":"aws", \
  "vendor_metadata":{ \
    "region":"eu-central-1", \
    "instanceId":"aws-rds-1", \
    "accessKeyId":"ACCESS_KEY", \
    "secretAccessKey":"AWS_SECRET"\
  }}]' \
  public.ecr.aws/o2c0x5x8/mmc:latest

```

Example 3. Monitoring a RDS for PostgreSQL server and RDS MySQL server. 

```bash

docker run -d --name metis-md-collector \
  -e API_KEY="METIS_API_KEY" \
  -e CONNECTION_STRING='[ \
    { \
      "uri": "postgresql://meits:your_password@host_name.eu-central-1.rds.amazonaws.com:5432", \
      "host_vendor": "aws", \
      "vendor_metadata": { \
        "region": "eu-central-1", \
        "instanceId": "aws-rds-1", \
        "accessKeyId": "ACCESS_KEY", \
        "secretAccessKey": "AWS_SECRET" \
      } \
    }, \
    { \
      "uri": "mysql://metis:your_password@mysql-rds-1.eu-central-1.rds.amazonaws.com:3306", \
      "host_vendor": "aws", \
      "vendor_metadata": { \
        "region": "eu-central-1", \
        "instanceId": "mysql-rds-1", \
        "accessKeyId": "ACCESS_KEY", \
        "secretAccessKey": "SECRET_KEY" \
      } \
    } \
  ]' \
  public.ecr.aws/o2c0x5x8/mmc:latest

```

**Example 4. monitored database**

```bash
docker run -d --name metis-md-collector-mysql \
-e API_KEY="REPLACED_WITH_DUMMY_TEXT" \
-e CONNECTION_STRING='[{ "uri":"mysql://metis:password@mysql-rds-1.eu-central-1.rds.amazonaws.com:3306", \
"host_vendor":"aws","monitored_databases":["db_1", "db_2", "DB_3"] ,"vendor_metadata":{ "region":"eu-central-1", \
"instanceId":"mysql-rds-1", "accessKeyId":"ACCESS_KEY", \
"secretAccessKey":"SECRET_KEY"}}]' \
public.ecr.aws/o2c0x5x8/mmc:latest

```

## Deployment Script - HELM

**Example 1 - a PostgreSQL server with CloudWatch Metrics**.
```bash

helm repo add metis https://charts.metisdata.io
helm install mmc metis/mmc-chart \
--set metis.API_KEY=API_KEY \
--set metis.CONNECTION_STRING='[{ "uri":"postgresql://mysql-rds-1.eu-central-1.rds.amazonaws.com:5432" \
, "host_vendor":"aws", "vendor_metadata":{ "region":"eu-central-1", "instanceId":"database-2", \
"accessKeyId":"ACCESS_KEY", "secretAccessKey":"AWS_SECRET"}}]'

```
