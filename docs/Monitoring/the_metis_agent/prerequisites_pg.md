---
sidebar_position: 2
---

# Prerequisites - PostgreSQL

## Create a new user

Create a new DB user called `metis`. This user will be used by the MMC Agent. 

```sql
-- Create a new user called "metis". Do not forget to change the password.
CREATE USER metis WITH PASSWORD 'your_password';
```

  
## Grant Permissions to the user

The user should be a member of the role `pg_monitor`. This a built-role dedicated for monitoring users.
```sql
-- Grant the permission "pg_monitor" to the user
GRANT pg_monitor TO metis;
```

Grant the CONNECT permissions on every databases. See below a script to use when when your PostgreSQL server has a large number of databases

```sql
--Grant access to EVERY database the Metis agent should monitor.
GRANT CONNECT ON DATABASE <DATABASE_NAME> TO metis;
```


## Create the pg_stat_statements Extension

Create the extension pg_stat_statements in every database. See below a script to use when when your PostgreSQL server has a large number of databases

```sql
-- Enable extension in every database that you want to monitor
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```


## Configuration of a Large Number of Databases

A script to configure the prerequisites on every database
```sql
DO $$
DECLARE
    db RECORD;
BEGIN
    -- Select databases that are not templates and not the RDS administrative database
    FOR db IN SELECT datname FROM pg_database WHERE datistemplate = false AND datname != 'rdsadmin' LOOP
      
        EXECUTE format('GRANT CONNECT ON DATABASE %I TO metis', db.datname);
       
        PERFORM pg_catalog.set_config('search_path', '', false);
        PERFORM pg_catalog.set_config('search_path', db.datname, true);
        
        EXECUTE format('GRANT pg_monitor TO metis;');
   
        -- Create the pg_stat_statements extension
        CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
    END LOOP;
END $$;
```
