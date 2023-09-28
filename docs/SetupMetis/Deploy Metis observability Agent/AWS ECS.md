---
sidebar_position: 2
---

# 💠 AWS ECS

## Deploy to ECS using CloudFormation

Deploy the Metis agent to **[Amazon Elastic Container Service](https://aws.amazon.com/ecs/) (ECS)** using CloudFormation.

Amazon Elastic Container Service (Amazon ECS) is a fully managed container orchestration service that simplifies your deployment, management, and scaling of containerized applications. Simply describe your application and the resources required, and Amazon ECS will launch, monitor, and scale your application across flexible compute options with automatic integrations to other supporting AWS services that your application needs.

## Using Stacks

When you use CloudFormation, **you manage related resources as a single unit** called a **stack**. You create, update, and delete a collection of resources by creating, updating, and deleting stacks. All the resources in a stack are defined by the stack's CloudFormation template.

## Configure and create Metis agent stack

Open Metis’s **[CloudFormation Template](https://console.aws.amazon.com/cloudformation/home?#/stacks/create/review?templateURL=https://metis-data-market-public.s3.eu-central-1.amazonaws.com/metadata-collector-cloudformation.yaml&stackName=MetisMetadataCollector)**

![Screenshot 2023-09-19 at 11.26.02.png](ECS/Screenshot_2023-09-19_at_11.26.02.png)

The first section shows the template URL and description

**Stack name** - The stack’s name, the default is **MetisMetadataCollector**.

## Parameters

Parameters allow you to input values that will configure the agent to operate on your database.

**AgentEnvironment** - which environment the agent is going to be deployed to, this parameter will determine if Slow-query-log will be activated. \*\*\*\*

**AwsAccessKeyId** - \***\*the AWS access key, used to retrieve information form [CloudWatch](https://aws.amazon.com/cloudwatch/). \*\***

**AwsRegion -** the AWS region the agent is going to be deployed in. such as “eu-central-1”.

**AwsSecretAccessKey** - the AWS secret access key, used to retrieve information form [CloudWatch](https://aws.amazon.com/cloudwatch/).

**ClusterName** - the AWS cluster name, the default is metis-collector.

**ConnectionStrings** - the connection string to the Postgres server, In the following convention: `postgresql://postgres:password@rds_name:5432`

Metis agent can monitor multiple databases, to do that add connection string for every database you would like to monitor, separated by semicolon `;` .

**MetisAPIKey** - a valid Metis API key. [🥽 Create a project & generate API key](../Create%20a%20project%20&%20generate%20API%20key.md)

**MetisEnvironment** - the environment (Cloud/On-premise) in which the agent is going to be deployed to. Select “cloud”

**ProviderMetadata** - the metadata that will help CloudFormation understand how to interact with the resource provider. In the following format: `'[{"resource":"rds","instance_id":"","provider":"aws"}]'`

the `resource` should be `rds` and `provider` should be`aws` the `instance_id` is the DB identifier on RDS
**SecurityGroupId** - the security group you would like to attach to the agent.

**SubnetId** - the subnet(s) where the agent will run. multiple choice.

After configuring all the parameters you need to acknowledge required access capabilities:

![Screenshot 2023-09-19 at 12.27.17.png](ECS/Screenshot_2023-09-19_at_12.27.17.png)

Finally, click on Create stack button
