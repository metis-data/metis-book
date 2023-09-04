# Using HELM Chart

To deploy an Metis agent using [HELM charts](https://helm.sh), follow the instructions in the [GitHub Repository](https://github.com/metis-data/helm-charts).

### Usage

[Helm](https://helm.sh/) must be installed to use the charts.

### Prerequisites

- A Kubernetes cluster running version 1.11 or later.
- Helm installed and initialized in your cluster. Please refer to Helm's [documentation](https://helm.sh/docs) to get started.
- An access to the Kubernetes cluster with sufficient privileges to create and manage resources.

### Setup

1. Add the Metis Helm repository to your local Helm installation and update the Helm repository to ensure that you have the latest version:

```bash
helm repo add metis-data https://metis-data.github.io/helm-charts/
helm repo update
```

If you had already added this repo earlier, run `helm repo update` to retrieve the latest versions of the packages.

You can then run `helm search repo teletrace` to see the charts.

1. Create helm chart connection on your relevant namespace and install Metis agent

```bash
helm install metis-mmc metis-data/metis-md-collector \
  --set METIS_API_KEY=DHuUr5UXrg1jP0ZuB8Sl35t970UpQ5eFr75SD0xb \
  --set DB_CONNECTION_STRINGS=postgresql://postgres:postgres@localhost:5432/platform;
```

Environment parameters:

- `METIS_API_KEY` - the Metis API key [Create a project & generate API key](../Create%20a%20project%20&%20generate%20API%20key.md)
- `DB_CONNECTION_STRINGS` - your database connection details e.g 'postgres://user:password@host:port/database’

**Customize installation**

(Optional) Customize Metis agent installation by modifying the values in the Helm chart. You can modify the values in the Helm chart by creating a YAML file with your custom values and using the --values option. For example:

```bash
helm install metis-mmc metis-data/metis-md-collector -f my-values.yml --namespace metis --create-namespace
```

### Clean up

```bash
helm delete metis-mmc --namespace metis
```
