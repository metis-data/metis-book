---
sidebar_label: '👋 Metis Overview'
sidebar_position: 1
slug: /
---

# Metis Overview

## What is Metis

Today’s developers and DevOps teams need better tooling and self-service solutions to move fast with confidence. Those tools need to integrate with modern solutions, allow quick troubleshooting, and provide rich context.

Metis is a **database guardrails solution**. Metis empowers developers and teams to own their databases and move fast. No mater what their expertise or background is, they can reliably maintaing their solutions.

With Metis you can prevent issues from reaching production, proactively monitor your databases, and troubleshoot with context when needed.

![spaces%2F-MiqIHa1G-OhMZ7Fui__%2Fuploads%2FhYF0qECd50t9OyEqNSk0%2Fimage.webp](Quickstart/HowItWorksDiagram.png)

## The 3 Pillars of Metis

Metis is built on 3 pillars:

### Prevention

Metis prevents your database code from breaking production by detecting database-related problems during the development and CI/CD, well before the new code is deployed to the production environment. Thanks to integration with developers' environments, Metis can detect issues before developers even commit their code to the repository.

### Monitoring

Metis provides advanced monitoring of the production environment. Metis collects and organizes information about performance, schema, ongoing tasks, and configuration. The users can view the data in dashboards.

### Troubleshooting

Metis gives clear insights about the root cause of the issues and all the relevant context for quickly solving the problems. The users don't need 


## Real-World Examples
- A query is inefficient, it scans large tables. The IO is a bottleneck that affects the system.

- A new version of the application changed the schema and accidentally deleted an index, which caused many queries to perform slowly.

- A query used to work fine for a long time. But as the amount of data in the database grows, the query becomes slower.

- Many temporary files are created when the queries sort the data, which makes the IO a bottleneck.

- The allocated amount of memory is simply not enough to support the workload.

- The statistics of the tables aren’t up to date. As a result, the query optimizer generates suboptimal plans.


## Quick start

Metis’s Quick Start takes around 5 minutes.

By the end of it, you will have a good basic understanding of how Metis works.
