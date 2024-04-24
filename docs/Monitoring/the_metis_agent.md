---
sidebar_position: 1
---

# 🤖 The Metis Agent

**Metis Metadata Collector (MMC)** is an agent designed to collect information from your database servers and send it to the Metis platform. The agent is engineered to operate with minimum permissions, analyzing only system tables and not accessing any sensitive user data. Furthermore, it is lightweight, ensuring minimal impact on system performance.

The data collected by MMC is utilized by the platform to generate dashboards, insights, and alerts, providing you with valuable information about your database environment.

The web app displays the collected data under the 'Monitoring' page.


## Deployment Flow

The deployment of Metis Metadata Collector (MMC) involves several steps to ensure seamless integration with your database servers. The first crucial step is to fulfill the prerequisites. It's important to note that PostgreSQL and MySQL have different prerequisites.

Regardless of the database type, the prerequisites include:

1. **Creating a New Dedicated User with Minimum Permissions**: This is considered a best practice to enhance security. The dedicated user will be used by MMC to access the database servers.
2. **Creating the Metis Schema and Required Objects**: To facilitate this step, we provide scripts and a user-friendly wizard. These resources streamline the process, ensuring that the Metis schema and all necessary objects are created swiftly and accurately.
3. (Optional) **Host Metrics from AWS CloudWatch**

These tools streamline the setup process, enabling you to focus on harnessing the power of Metis without getting caught up in complicated deployment tasks.

Once the prerequisites are met, you'll be ready to seamlessly integrate MMC with your PostgreSQL or MySQL database servers

## Limitations

- The Agent monitors PostgreSQL v13 or higher
- The Agent monitors MySQL v8 or higher
