---
sidebar_position: 2
---

# Prerequisites - PostgreSQL

For effective monitoring, it`s recommended to grant the Metis agent specific permissions by creating a dedicated user.
This ensures the agent operates with the minimum privileges required for its tasks, enhancing both security and performance.

## Create a new user

Create a new DB user called `metis`. This user will be used by the MMC Agent. 

```sql
-- Create a new user called "metis". Do not forget to change the password.
CREATE USER metis WITH PASSWORD 'your_password';
```

## 1. Grant Host Level permissions
Allows the Metis Agent to access the "public" schema, which includes the ability to see objects within the schema but not to modify them.


```sql
GRANT pg_monitor TO metis;
```

## 2. Grant Permissions and create an explain function on default db (postgres)
Creates a function called "explain_parameterized_query" that runs dynamic SQL queries and returns results in JSON format. This function will be configured to execute with the same permissions as its creator, providing an additional security layer. Metis Agent will gain permission to use this function.

```sql
GRANT USAGE ON SCHEMA public TO metis;

CREATE OR REPLACE FUNCTION explain_parameterized_query(query_text TEXT) RETURNS JSON AS $$
DECLARE
result JSON;
BEGIN
/* metis */ EXECUTE query_text INTO result;
RETURN result;
END;
$$ LANGUAGE plpgsql;

ALTER FUNCTION explain_parameterized_query(query_text TEXT) SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION explain_parameterized_query(TEXT) TO  metis;
```

## 3. Grant Connect and Usage permissions in each monitored database
Metis Agent will first be granted the ability to connect to your database, then ensure that the pg_stat_statements extension is installed, which tracks execution statistics of all SQL statements, enabling them to monitor and optimize query performance effectively.

```sql
GRANT CONNECT ON DATABASE <DATABASE_NAME> TO metis;

CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

## 4. Grant SELECT to enable DDL generation for SVG schema (optional) in each monitored database
Metis Agent will be able to generate ddl of your database and send it to extract visualized schema

```sql

DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT nspname FROM pg_namespace WHERE nspname NOT LIKE 'pg_%' AND nspname <> 'information_schema')
    LOOP
        -- Grant USAGE on all schemas        
        EXECUTE 'GRANT USAGE ON SCHEMA ' || quote_ident(r.nspname) || 'TO metis';
        -- Grant SELECT on all tables in each schema
        EXECUTE 'GRANT SELECT ON ALL TABLES IN SCHEMA ' || quote_ident(r.nspname) || ' TO metis';
        -- Set default privileges for tables
        EXECUTE 'ALTER DEFAULT PRIVILEGES IN SCHEMA ' || quote_ident(r.nspname) || ' GRANT SELECT ON TABLES TO metis';
    END LOOP;
END $$;

```









  
