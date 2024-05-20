---
sidebar_position: 4
---

# Prerequisites - AWS 
## CloudWatch Metrics
When monitoring PostgreSQL or MySQL, certain information cannot be retrieved using SQL queries. To access metrics like CPU usage or available memory, the agent must interface with AWS CloudWatch.

Accessing CloudWatch requires appropriate permissions. The best practice is to create a new user or role and utilize its Access Key and Secret Key, or [Assume Role](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html) functionality. Ensure that the user or role is granted permissions specifically for CloudWatch.

The deployment script or Deployment Wizard expects either the Access Key and the Secret Key or the ARN of the Role. 

### Grant Permissions to the Role or User

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

## Outbound Rules
Configure the security group to allow the following endpoints, used by the Metis Agent
- URL: https://mmc.metisdata.io
  - Purpose: Data storage and pipeline trigger.
  - Protocol: HTTPS (Amazon S3 specific)
  - App Endpoint (HTTPS)

- URL: https://app.metisdata.io/
  - Purpose: Main application services.
  - Protocol: HTTPS
  - Ingest Endpoint (HTTPS)

- URL: https://ingest.metisdata.io
  - Purpose: Traces ingestion and processing.
  -  Protocol: HTTPS
