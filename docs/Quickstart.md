---
sidebar_label: '⏱️ Quickstart!'
sidebar_position: 2
---

# Quickstart!
Welcome to Metis! In this quick tutorial, we will go over the basic steps of setting up your account with Metis and monitor a PostgreSQL server using Metis Agent. 
Let’s get started!

## Create a New Metis account
The first step is creating an account. This account will be used to generate API Keys and store the traces, metrics and other data sent to the platform. 
![Untitled](Quickstart/metis_login_page.png) 

## Configure a Metis Agent
First, you will need to configure a Metis Agent, a tool that helps collect important information from PostgreSQL and MySQL servers. It keeps an eye on things like what the database is doing, any changes to its structure, its settings, and the size of its tables. By tracking these details, Metis Agent gives administrators and users useful data to understand and improve the performance of their databases. 

The easiest way to configure an Agent is using a **Wizard**. To learn how to use the wizard watch this [video](https://youtu.be/K8yMuhfBGfU) or follow the steps below. 

Go to the page [Monitoring](https://app.metisdata.io/monitoring). Click on the button “Deploy” to open the configuration Wizard.

![Untitled](Quickstart/New_PG_Wizard_Select_vendor.png)

Execute the scripts to create the necessary prerequisites. The Agent requires an extension called ```pg_stat_statements```. 
Enter a connection string to the PoatgreSQL server. It should look like this
`postgresql://user_name:your_password@host.region.rds.amazonaws.com:5432` .   

By providing AWS credentials, the Agent can also collect the OS metrics, such as CPU (optinal). 

![Untitled](Quickstart/New_PG_Wizard_Con_str.png)

Copy and run the generated Docker command to start monitoring the DB server. 
![Untitled](Quickstart/New_PG_Wizard_Docker_Run.png)


Notice the wizard created automatically and API Key. 

<aside>
❗ It might take 2-3 minutes to see the data.
</aside>  
  
Go back to the page **Monitoring**. The new monitored PostgreSQL server can be found there.
