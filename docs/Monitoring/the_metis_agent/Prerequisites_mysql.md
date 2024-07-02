---
sidebar_position: 4
---

# Prerequisites - MySQL
## Enable Performance Schema

The [MySQL Performance Schema](https://dev.mysql.com/doc/refman/8.3/en/performance-schema.html) is a feature for monitoring MySQL Server execution at a low level. 

To set up AWS RDS or Aurora, configure the AWS RDS Parameter Group manually.

| PARAMETER | VALUE |
| --- | --- |
| performance_schema | 1 |
| max_digest_length | 4096 |
| performance_schema_max_digest_length | 4096 |

To apply the new settings, you'll need to restart the server.

## Create a new user

Create a new DB user called `metis`. This user will be used by the MMC Agent. 

```sql
CREATE USER 'metis' @'%' IDENTIFIED BY 'YOUR_PASSWORD';
```

## Grant Permissions and Create a new Schema

To simplify the process the script grants the required permissions and creates a new schema called metis. 

Notice the user who run this script must be the admin of the MySQL as it grants permissions to the new user `metis`.

On-Prem MySQL

```bash
curl -s https://static.metisdata.io/metis-mysql.sql | MYSQL_PWD="ADMIN_PASSWORD" mysql -h "[mysql-for-test.cofhrj7zmyn4.eu-central-1.rds.amazonaws.com](http://mysql-for-test.cofhrj7zmyn4.eu-central-1.rds.amazonaws.com/)" -u "ADMIN_USER" mysql
```

AWS RDS for MySQL

```bash
curl -s https://static.metisdata.io/metis-mysql-rds.sql | MYSQL_PWD="ADMIN_PASSWORD" mysql -h "[mysql-for-test.cofhrj7zmyn4.eu-central-1.rds.amazonaws.com](http://mysql-for-test.cofhrj7zmyn4.eu-central-1.rds.amazonaws.com/)" -u "ADMIN_USER" mysql

```

The difference between the two file: The local MySQL server requires the configuration of two parameters:

```bash
set global sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
set session sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
```
