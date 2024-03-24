---
sidebar_label: ' Prevention'
sidebar_position: 4
---

#  Prevent issues on your database

## BEFORE the deployment
Production problems within a database environment can lead to substantial financial losses, impact customer satisfaction, and pose significant challenges for resolution. Preventive measures taken during development and testing are critical to avoiding such issues, ensuring a smoother operation in the production environment. This proactive approach not only saves costs but also enhances the overall user experience by minimizing downtime and performance disruptions. Below are key examples of preventive strategies to safeguard against potential production-related database problems.
Metis let you to see the SQL commands running in your environments, get insights about the performance and potential errors, and understand if it’s safe to deploy changes to production.

The prevention is done in two areas: 
### Query Optimization:

Identify and optimize inefficient queries during development to prevent performance issues in production. Address queries that read excessive rows or return a large result set.

### Schema Changes Review:

Before implementing schema changes, thoroughly review the impact on existing queries. Deleting an index used by many queries, for example, can be avoided with careful consideration.

