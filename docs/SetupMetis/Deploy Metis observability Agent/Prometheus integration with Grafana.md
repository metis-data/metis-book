# Prometheus integration with Grafana

### Flow overview

**Step 1 - Deploy a Prometheus Exporter**

Deploy a Prometheus Exporter to send performance counters from an AWS RDS or directly from Postgres.

:::tip
Assuming you already have a Prometheus Server and Grafana Server.

:::

**Step 2 - Configure Prometheus**

Configure Prometheus to import the performance counters

**Step 3 - Download a Grafana Dashboard from the Marketplace**

Download a Grafana Dashboard from the Dashboard marketplace in one click. Configure the dashboard with the Prometheus data source and Metis API Key.

## Detailed Flow

**Step 1 - Deploy a Prometheus exporter**

:::tip
The current version only supports AWS RDS. If your production Postgres servers use EC2 or K8S, please contact our support for guidelines on how to deploy a Prometheus server and Grafana Dashboard.
:::
**Background**

The implementation of the Prometheus exporter uses [promcat](https://promcat.io/), a resource catalog for enterprise-class Prometheus monitoring. It has a configuration file for [AWS RDS](https://promcat.io/apps/aws-rds).

The configuration of the exporter requires:

1. AWS Credentials - without valid credentials, CloudWatch will deny access to the performance counters. To connect to CloudWatch, either configure AWS Access Key and Secret Key or use Assume Role. More details are below.
2. A list of relevant performance counters. Don't worry about this step, we provide the configuration.
3. Metis API Key - to link the Grafana Dashboard with the detailed DB metadata and analysis, collected by the Metis Metadata Collector.

**AWS Credentials**

There are many ways to store and manage AWS credentials.

**Option 1 - Environment variables:** This is the simplest option, just create 2 environment variables. `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. If you are not using the default AWS region, then you'll have to create a 3rd environment variable for the AWS region.
For more information go to [Environment variables to configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html).

**Option 2 - Credential file:** Configure an AWS Credentials file using the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) `aws configure`. That generates an AWS credential file (by default saved to `$HOME/aws/credentials`). Copy the file to the docker container.

The file looks similar to this:

```bash
# CREDENTIALS FOR AWS ACCOUNT
aws_region = us-east-1
aws_access_key_id = ABBBBCCCCDDDDEEEEXXXXX
aws_secret_access_key = gXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**AWS Permissions**

The credentials created in the previous step require permission to read the performance counters.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudWatchExporterPolicy",
      "Effect": "Allow",
      "Action": [
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

**Step 1 - Deploy the Prometheus Exporter**

The Prometheus Exporter uses [YACE](https://github.com/nerdswords/yet-another-cloudwatch-exporter/tree/master) (yet-another-cloudwatch-exporter).

1. 1.Clone the Repository [https://github.com/metis-data/metadata-collector.git](https://github.com/metis-data/metadata-collector.git)
2. 2.Move to folder: `cd tele-metric`.
3. 3.Set execution permission: `chmod +x ./start_exporter.sh`
4. 4.Run the execution file `./start_exporter.sh` . The script doesn't ask for AWS credentials.

![image-4.png](Prometheus%20integration%20with%20Grafana/image-4.png)

You can also deploy the Prometheus Exporter using a **HELM** chart. More details [here](https://artifacthub.io/packages/helm/mogaal/prometheus-yace-exporter).

**Step 2 - Configure Prometheus**

:::tip
Make sure the Prometheus server can connect to the Prometheus exporter (IP and ports).

:::

Configure a Metis API Key. The Metis API Key is used by Metis Platform for a deep DB Analysis. Configure the file `tele-metric/rds-prometheus/prometheus.yml` .

```json
global:
  scrape_interval: 10s
  scrape_timeout: 9s

scrape_configs:
  - job_name: "yace"
    static_configs:
    - targets: ["<PROMETHEUS_EXPORTER_IP>:8080"]
      labels:
        apikey: '<API_KEY_HERE>'
```

**Step 3 - Create a Grafana Dashabord**

Import the Metis AWS RDS [dashboard](https://grafana.com/grafana/dashboards/19252) from the Grafana Dashboards Marketplace.

The Dashboards look similar to this:

![image-5.png](Prometheus%20integration%20with%20Grafana/image-5.png)

Configure the **Data Source** to use the Prometheus Server

![Enter a valid URL of Prometheus. The server might require credentials too.](Prometheus%20integration%20with%20Grafana/image-6.png)

Enter a valid URL of Prometheus. The server might require credentials too.

Open the **Dashboard.** It should look similar to this:

![image-7.png](Prometheus%20integration%20with%20Grafana/image-7.png)
