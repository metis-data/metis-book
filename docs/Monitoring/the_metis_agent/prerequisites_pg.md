---
sidebar_position: 3
---

# Prerequisites - PostgreSQL

For effective monitoring, it's recommended to grant the Metis agent specific permissions by creating a dedicated user. This ensures the agent operates with the minimum privileges required for its tasks, enhancing both security and performance.

## Steps to Set Up and Validate the Metis Agent

### 1. Create a new user

Create a new DB user called `metis`. This user will be used by the MMC Agent.

```sql
-- Create a new user called "metis". Do not forget to change the password.
CREATE USER metis WITH PASSWORD 'your_password';
```

### 2. Validate `psql` Installation

Ensure that you have `psql` installed on your system. You can verify this by running the following command:

```bash
psql --version
```
If `psql` is not installed, follow the instructions in the official PostgreSQL documentation to install it: [PostgreSQL Documentation](https://www.postgresql.org/docs/current/app-psql.html)

### 3.  Run the Setup Script

Use the provided setup script to automate the configuration process. This script will create the necessary user, grant permissions, and set up the required extensions and functions.

Run the following command, replacing HOST, PORT, ADMIN_USER, and ADMIN_PASSWORD with your PostgreSQL server details:

```bash
curl -sSL https://static.metisdata.io/postgres_setup.sh | bash -s -- HOST PORT ADMIN_USER ADMIN_PASSWORD
```


### 4. Run the Validation Script


After running the setup script, validate the setup to ensure everything was configured correctly:

```bash
curl -sSL https://static.metisdata.io/postgres_setup_validation.sh | bash -s -- HOST PORT ADMIN_USER ADMIN_PASSWORD
```

### 5. Explanation of the Setup Script

The setup script performs the following tasks:

1. **Checks for Required Arguments**: Ensures the necessary arguments (`hostname`, `port`, `admin_user`, `admin_password`) are provided.

2. **Fetches the List of Databases**: Retrieves a list of databases on the PostgreSQL server, excluding the default templates.

3. **Grants `pg_monitor` to the Metis User**: Provides the `pg_monitor` role to the Metis user to allow broad monitoring privileges.

4. **Grants Permissions and Creates Functions on the `postgres` Database**:
    - Grants usage permission on the `public` schema to the Metis user.
    - Creates the `explain_parameterized_query` function.
    - Grants execution permission on the `explain_parameterized_query` function to the Metis user.
    - Creates and configures the `pg_stat_statements` and `hypopg` extensions.
    - Grants usage permissions on all schemas in the `postgres` database to the Metis user.

5. **Grants Permissions on Each Database**:
    - Grants connect permission on each database to the Metis user.
    - Ensures the `pg_stat_statements` extension is created on each database.
    - Creates the `explain_parameterized_query` and `index_advisor` functions on each database.
    - Grants execution permission on these functions to the Metis user.
    - Grants usage permissions on all schemas in each database to the Metis user.

You can download and review the complete setup script using the following command:

```bash
curl -sSL https://static.metisdata.io/postgres_setup.sh -o postgres_setup.sh
````

