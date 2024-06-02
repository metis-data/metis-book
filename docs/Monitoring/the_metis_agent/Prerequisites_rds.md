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
   - Edit the parameter group **performance-schema** to **1**

   ![Example banner](/img/rds-prerequisite-performance-schema.png)

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

To request a change in the parameter group for an Amazon RDS PostgreSQL instance, follow these steps:

1. **Sign in to the AWS Management Console**:
   - Go to the [AWS Management Console](https://aws.amazon.com/console/).

2. **Navigate to the RDS Dashboard**:
   - In the AWS Management Console, select **RDS** from the services menu.


3. **Modify the Parameter Group**:
   - Select the newly created parameter group.
   - Click on **Edit parameters**.
   - Modify the desired parameters as needed.
    - Edit the parameter group **shared_preload_libraries** to **pg_stat_statement**

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





