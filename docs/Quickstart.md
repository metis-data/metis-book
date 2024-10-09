---
sidebar_label: '⏱️ Quickstart!'
sidebar_position: 2
---

# Quickstart!
Welcome to Metis! In this brief tutorial, we’ll walk you through the essential steps to set up your Metis account and demonstrate how to monitor a PostgreSQL server using the Metis Metadata Collector (MMC). The process for MySQL is very similar, so you can apply these instructions to either database. Let’s dive in!

## Create a New Metis account
The first step is creating an account. The account will be used to generate the API keys and store the traces, metrics, and other data sent to the platform. 
![Untitled](Quickstart/metis_login_page.png) 

## Configure Metis Metadata Collector
First, you will need to configure Metis Metadata Collector, a tool that helps collect important information from database servers. It keeps an eye on things like what the database is doing, any changes to the database's structure or settings, and the size of the tables. By tracking these details, Metis Metadata Collector gives administrators and users useful data to understand and improve the performance of their databases. 

The easiest way to configure Metis Metadata Collector is using a **Wizard**. To learn how to use the wizard watch [this video](https://youtu.be/K8yMuhfBGfU) or follow the steps below. 

Go to the page [Monitoring](https://app.metisdata.io/monitoring). Click on the button **Deploy** to open the configuration Wizard.

![Untitled](Quickstart/New_PG_Wizard_Select_vendor.png)

Select your hosting infrastructure and click **Next**.

![Untitled](Quickstart/New_PG_Wizard_Configure_server.png)

Execute the scripts to create the necessary prerequisites. Metis Metadata Collector requires the extension called ```pg_stat_statements```.

Once you are done, click **Next**.

![Untitled](Quickstart/New_PG_Wizard_Con_str.png)

Enter the connection string to the database server. For PostgreSQL, it should look like this

```
postgresql://user_name:your_password@host.region.rds.amazonaws.com:5432
````

By providing the AWS credentials, Metis Metadata Collector can also collect the infrastructure metrics, such as CPU. This is optional.

Click **Next**.

![Untitled](Quickstart/New_PG_Wizard_Docker_Run.png)

Copy and run the generated Docker command to start monitoring the database server. The data will start flowing right away.

:::note
❗ It might take 2-3 minutes to see the data.
:::
  
Go back to the page [Monitoring](https://app.metisdata.io/monitoring). The new monitored database server can be found there.
