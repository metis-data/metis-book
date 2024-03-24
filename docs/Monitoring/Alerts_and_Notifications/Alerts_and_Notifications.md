---
sidebar_label: 'Rules'
sidebar_position: 1
---

# Rules

## A Rule

A rule in our system sets the conditions for when an alert should be triggered. These conditions can be straightforward, like when CPU usage goes above 90%, or more complex, such as when database statistics haven't been updated for over 14 days, and the table size exceeds 100 gigabytes.

Moreover, the rule also determines which notification channels are used to inform users about the detected issues. This ensures that users receive timely updates whenever something goes wrong in the database.


To avoid "alert fatigue," the system refrains from sending the same alert within the following 5 minutes after it's triggered. Upcoming versions will provide enhanced control over when to send alerts that have been recently fired.

## Built-in Rules

When a new host is monitored by Metis Collector, the system automatically detects the event and generates a few useful rules. 

You can change the default conditions or disable the rules.

## Create a new Rule  - Coming Soon!

You can configure your rules based on any of the supported metric. Rules can be created on the host level, DB, table or a query. 

To create a new rule you’ll need to provide: 

- Name
- Is enabled
- The metric. Metis collects many metrics for different DB objects. Tables uses different metrics than databases.
- Threshold
- Time range - It is recommended to calculate the metric over long enough time range to get a clear indication there is a problem, rather than many false alarms of short spikes in resources utilizations.

A rule can have multiple conditions to provide high value alerts, fired only when a set of conditions happen at the same time.
