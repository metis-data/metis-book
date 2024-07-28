---
sidebar_position: 1
---

# Prerequisites -  RDS 

## MySQL

To request a change in the parameter group for an Amazon RDS MySQL instance, follow these steps:

1. **Sign in to the AWS Management Console**:
   - Go to the [AWS Management Console](https://aws.amazon.com/console/).

2. **Navigate to the RDS Dashboard**:
   - In the AWS Management Console, select **RDS** from the services menu.

3. **Create a New Parameter Group**:
   - In the RDS dashboard, select **Parameter groups** from the navigation pane.
   - Click on **Create parameter group**.
   - In the **Create parameter group** dialog box:
     - Select **Parameter group family** based on your MySQL version (e.g., `mysql8.0`).
     - Enter a name and description for the parameter group.
     - Click **Create**.

4. **Modify the Parameter Group**:
   - Select the newly created parameter group.
   - Click on **Edit parameters**.
   - Modify the desired parameters as needed.
   - Edit the parameter group with the following attributes:

   | PARAMETER | VALUE |
   | --- | --- |
   | performance_schema | 1 |
   | max_digest_length | 4096 |
   | performance_schema_max_digest_length | 4096 |

   - Save the changes.

5. **Apply the New Parameter Group to Your DB Instance**:
   - Go to **Databases** in the RDS dashboard.
   - Select the DB instance you want to modify.
   - Click on **Modify**.
   - In the **DB Parameter Group** dropdown, select the new parameter group.
   - Apply the changes:
     - You can apply immediately or during the next maintenance window.
   - Click **Continue** and then **Modify DB Instance**.

6. **Reboot Your DB Instance**:
   - If the changes were not applied immediately, you need to reboot your DB instance for the new parameters to take effect.
   - Select the instance and choose **Reboot** from the **Actions** menu.

## PostgreSQL

> **Note for RDS users**: Ensure that your RDS PostgreSQL version supports the HypoPG extension. If HypoPG is not supported, the Metis index advisor functionality will not work. You can check the list of supported extensions and their availability in the [RDS-PostgresSQL Extensions Support](https://docs.aws.amazon.com/AmazonRDS/latest/PostgreSQLReleaseNotes/postgresql-extensions.html).
>
> **Note for Aurora users**: For users of Amazon Aurora PostgreSQL, verify that your Aurora version supports HypoPG. If HypoPG is not supported, the Metis index advisor functionality will not work. You can check the supported extensions for Aurora PostgreSQL in the [RDS-Aurora-PostgresSQL Extensions Support](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraPostgreSQLReleaseNotes/AuroraPostgreSQL.Extensions.html).


To request a change in the parameter group for an Amazon RDS PostgreSQL instance, follow these steps:

1. **Sign in to the AWS Management Console**:
   - Go to the [AWS Management Console](https://aws.amazon.com/console/).

2. **Navigate to the RDS Dashboard**:
   - In the AWS Management Console, select **RDS** from the services menu.


3. **Modify the Parameter Group**:
   - Select the newly created parameter group.
   - Click on **Edit parameters**.
   - Modify the desired parameters as needed.
    - Edit the parameter group **shared_preload_libraries** to **pg_stat_statements**

      ![Example banner](/img/rds-prerequisutes-shared-buff-parameter-group.png)

    - Edit the parameter group **plan_cache_mode** to **force_generic_plan**

      ![Example banner](/img/rds-prerequisutes-custom-plan.png)
   - Save the changes.



4. **Apply the New Parameter Group to Your DB Instance**:
   - Go to **Databases** in the RDS dashboard.
   - Select the DB instance you want to modify.
   - Click on **Modify**.
   - In the **DB Parameter Group** dropdown, select the new parameter group.
   - Apply the changes:
     - You can apply immediately or during the next maintenance window.
   - Click **Continue** and then **Modify DB Instance**.

5. **Reboot Your DB Instance**:
   - If the changes were not applied immediately, you need to reboot your DB instance for the new parameters to take effect.
   - Select the instance and choose **Reboot** from the **Actions** menu.

By following these steps, you can successfully change the parameter group for both MySQL and PostgreSQL instances in Amazon RDS.

### Performance Insights

Performance Insights provides detailed insights into the health and performance of your RDS instances. Follow these steps to enable Performance Insights:

1. **Sign in to the AWS Management Console**:
   - Go to the [AWS Management Console](https://aws.amazon.com/console/).

2. **Navigate to the RDS Dashboard**:
   - In the AWS Management Console, select **RDS** from the services menu.

3. **Enable Performance Insights**:
   - Select the DB instance you want to monitor.
   - Click on **Modify**.
   - In the **Performance Insights** section, select **Enable Performance Insights**.
   - Choose the retention period for the performance data.
   - Click **Continue** and then **Modify DB Instance**.

4. **Review Performance Data**:
   - Go to the **Performance Insights** tab for your DB instance.
   - Review the available performance metrics.

> **Note**: Performance Insights is required to view Avg Active Sessions on Aurora and RDS PostgreSQL. Additionally, Performance Insights is necessary for monitoring throughput read in Aurora. The free edition of Performance Insights is sufficient for these purposes. Without enabling Performance Insights, these metrics will not be displayed.
