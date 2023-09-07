---
sidebar_position: 1
---

# 🐳 Docker

Deploy Metis agent using Docker

### Run a Docker image of the Metis agent

Monitoring on AWS RDS

```bash
docker run -d --name metis-md-collector \
-e API_KEY="YOUR_METIS_API_KEY" \
-e DB_CONNECTION_STRINGS="postgresql://postgres:password@rds_name:5432" \
-e METIS_PROVIDER_METADATA="[{\"resource\":\"rds\",\"instance_id\":\"INSTANCE_ID\",\"provider\":\"aws\"}]" \
-e METIS_AWS_ACCESS_KEY_ID="AWS_ACCESS_KEY_ID" \
-e METIS_AWS_SECRET_ACCESS_KEY="AWS_SECRET_ACCESS_KEY" \
-e METIS_AWS_REGION="AWS_REGION_NAME" \
-e CRON_LOCAL_RUNNING_EXP="0 * * * *" \
-e METIS_ENVIRONMENT="cloud" \
--net=host \
public.ecr.aws/o2c0x5x8/metis-md-collector:latest
```

Monitoring on non AWS RDS

```bash
docker run -d --name metis-md-collector \
-e API_KEY="YOUR_METIS_API_KEY" \
-e DB_CONNECTION_STRINGS="postgresql://postgres:password@rds_name:5432" \
public.ecr.aws/o2c0x5x8/metis-md-collector:latest
```

### Command explanation

- `d` - The agent writes logs to the terminal window. use `-d` to hides them.
- `-name` - The name of the Docker container
- `e` used for setting parameters, use `e` before any parameter set
- The Docker image requires the following parameters:
  - `API_KEY=YOUR_API_KEY` - Enter here the Metis API Key.
  - `DB_CONNECTION_STRINGS=postgresql://postgres:password@rds_name:5432` - A connection string to Postgres Server.
    Metis agent can monitor multiple databases, to do that add connection string for every database you would like to monitor, separated by comma.
  - `METIS_AWS_REGION=AWS_REGION` - The AWS region. For ex. eu-central-1
  - `CRON_LOCAL_RUNNING_EXP="* * * * *"` - The agent runs in the background. This property controls how often the MMC runs the SQL commands to collect data. "\* \* \* \* _ " means every minute. "0 _ \* \* \_ " means every round hour. You can use a site such as [Cronitor](https://crontab.guru/#__*_____*) to learn how to configure the Cron scheduler.
  - `METIS_PROVIDER_METADATA="[{"resource":"rds","instance_id":"*ENTER_HERE_THE_INSTANCE_ID*","provider":"aws"}]"` - Replace with the instance ID. (For ex.for _database-2.abcdef12345.eu-central-1.rds.amazonaws.com_, use the string "database-2".)
  - `-net=host public.ecr.aws/o2c0x5x8/metis-md-collector:latest` - Downloads the latest version of the MMC.
