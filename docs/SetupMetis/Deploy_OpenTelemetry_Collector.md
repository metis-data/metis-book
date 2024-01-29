---
sidebar_label: 'Deploy Metis OpenTelemetry Collector'
sidebar_position: 6
---

# Deploy Metis OpenTelemetry Collector

As explained above, the Metis OpenTelemetry Collector reads the traces sent to the OpenTelemetry Collector and send them to Metis platform.  

## Run the Metis OTel Collector using Docker

Run the following script. 

```bash
docker run -d \
  -e CONNECTION_STRING=<YOUR_CONNECTION_STRING> \
  -e METIS_API_KEY=<YOUR_METIS_API_KEY> \
  -p 4317:4317 \
  -p 4318:4318 \
  --name metis-otel-collector \
  public.ecr.aws/o2c0x5x8/metis-otel-collector:latest
```

The Parameters: 

- CONNECTION_STRING - a connection string to the database used by the app. The connection string is needed to generate the execution plans.
- METIS_API_KEY - the Metis API Key used to identify your data in the platform.
- The port 4317 used by gRPC and 4318 by HTTP

### Run the Metis OpenTelemetry Collector on Amazon Elastic Container Service (ECS)

In the ECS task definition, add the code after the `containerDefinitions` array.

```json
"containerDefinitions": [
    {
        "name": "metis-otel-collector",
        "image": "public.ecr.aws/o2c0x5x8/metis-otel-collector:latest",
        "cpu": 0,
        "portMappings": [],
        "essential": true,
        "environment": [
            {
                "name": "METIS_API_KEY",
                "value": <YOUR_METIS_API_KEY>
            },
            {
                "name": "CONNECTION_STRING",
                "value": <YOUR_CONNECTION_STRING>
            }
        ],
        "mountPoints": [],
        "volumesFrom": [],
        "secrets": [],
        // If you want to configure logs for the container 
        "logConfiguration": {
            "logDriver": "awslogs",
            "options": {
                "awslogs-group": <aws-log-group>,
                "awslogs-region": <aws-region>,
                "awslogs-stream-prefix": <aws-log-prefix>
            }
        }
    }
    ...
]
```

## Changing the default ports

By default the Metis OpenTelemetry Collector uses the Open Telemetry specification.

```
HTTP_PORT - Default 4318
GRPC_PORT - Default 4317
```

If you modify the default ports, be sure to specify them in your app when setting up the collector endpoint.