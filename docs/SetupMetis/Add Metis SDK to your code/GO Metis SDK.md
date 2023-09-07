# 🐲 GO Metis SDK

## **General**

Metis GO SDK allows you have insights about your SQL commands originated from your code.

Run your code as usual while Metis generates distributed traces and sends them to our servers for further analysis, then you will be able to view crucial insights about your queries.

## **Supported GO packages**

HTTP:

1. net/http
2. gorilla/mux

Postgres:

1. lib/pq
2. gorm
3. ido50/sqlz

## **How it works**

Metis GO SDK uses OTEL to sends your code REST commands to Metis.

Metis Agent find SQL commands originating from those REST commands analyze them and combine all this information to create an E2E view of those traces and their analysis.

## **Prerequisite**

- A Metis account with a valid API key. [🥽 Create a project & generate API key](../Create%20a%20project%20&%20generate%20API%20key.md)
- OTEL
- Metis agent

## **Installation**

Clone the [Metis GO SDK](https://github.com/metis-data/go-interceptor) for Github

Run

```bash
go get github.com/metis-data/go-interceptor \
  go.opentelemetry.io/otel \
  go.opentelemetry.io/otel/sdk/trace
```

Set the api key environment variable: `METIS_API_KEY` [🥽 Create a project & generate API key](../Create%20a%20project%20&%20generate%20API%20key.md)

Enable OTEL instrumentation:

### Set up Tracer

```go
import (
  metis "github.com/metis-data/go-interceptor"
  _ "github.com/lib/pq"
  "go.opentelemetry.io/otel"
  "go.opentelemetry.io/otel/sdk/trace"
)

var tp *trace.TracerProvider
var err error
tp, err = metis.NewTracerProvider()
if err != nil {
  log.Fatal(err)
}
defer func() {
  if err := tp.Shutdown(context.Background()); err != nil {
    log.Fatal(err)
  }
}()
otel.SetTracerProvider(tp)
```

### Wrap your http server with Metis

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="http" label="Net/http">

```go
import (
  "fmt"
  "net/http"

  metis "github.com/metis-data/go-interceptor"
  _ "github.com/lib/pq"
)

// use metis.NewServeMux() instead of http.NewServeMux()
mux := metis.NewServeMux()
mux.HandleFunc("/api/endpoint", someHandler)
...

// Wrap the router with the metis handler
handler := metis.NewHandler(mux, "my-web-service")
err = http.ListenAndServe(fmt.Sprintf(":%s", port), handler)
```

</TabItem>
<TabItem value="mux" label="Gorilla/mux">

```go
import (
  "fmt"
  "net/http"

  "github.com/gorilla/mux"
  metis "github.com/metis-data/go-interceptor"
  _ "github.com/lib/pq"
)

  // Create a new gorilla/mux router
  router := mux.NewRouter()

  router.HandleFunc("/api/endpoint", someHandler)

  // Wrap the router with the metis handler
  metisRouter, err := metis.WrapGorillaMuxRouter(router)
  if err != nil {
      log.Fatal(err)
  }
  handler := metis.NewHandler(metisRouter, "web-go-gorm")
  err = http.ListenAndServe(fmt.Sprintf(":%s", port), handler)

  Wrap your database connection with Metis:

  import (
    "database/sql"
    "fmt"
    "log"

    metis "github.com/metis-data/go-interceptor"
    _ "github.com/lib/pq"
  )

  dbHost := "postgres"
  dbPort := 5432
  dbUser := "postgres"
  dbPassword := "postgres"
  dbName := "my_database"
  dbSchema := "my_schema"

  dataSourceName := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
      dbHost, dbPort, dbUser, dbPassword, dbName)

  var db *sql.DB
  var err error

  // Open a connection to the database via metis API
  db, err = metis.OpenDB(dataSourceName)
  if err != nil {
      log.Fatal(err)
  }
  defer db.Close()
```

</TabItem>

</Tabs>

### Wrap your database connection with Metis

<Tabs>
<TabItem value="pq" label="lib/pq">

```go
import (
  "database/sql"
  "fmt"
  "log"
  "net/http"
)

query := fmt.Sprintf("SELECT id, name FROM %s.my_table", dbSchema)

var rows *sql.Rows
var err error

// make sure to pass the context here
// r *http.Request
rows, err = db.QueryContext(r.Context(), query)
if err != nil {
    log.Fatal(err)
}
defer rows.Close()
```

</TabItem>
<TabItem value="gorm" label="lib/gorm">

```go
import (
  "database/sql"
  "fmt"
  "log"
  "net/http"

  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

query := fmt.Sprintf("SELECT id, name FROM %s.my_table", dbSchema)

var gormDB *gorm.DB
var err error

gormDB, err = gorm.Open(postgres.New(postgres.Config{
    Conn: db,
}), &gorm.Config{})
if err != nil {
    log.Fatal(err)
}

// make sure to pass the context here
// r *http.Request
gormDB = gormDB.WithContext(r.Context())
var users []User
gormDB.Raw(query).Find(&users)
```

  </TabItem>
  <TabItem  value="sqlz" label="ido50/sqlz">

```go
import (
  "database/sql"
  "fmt"
  "log"
  "net/http"

  "github.com/ido50/sqlz"
)

var sqlzDB *sqlz.DB
var user User
var err error

sqlzDB = sqlz.New(db, "postgres")

// make sure to pass the request context here
// r *http.Request
err = sqlzDB.
Select("id", "name").
From("my_schema.my_table").
GetRowContext(r.Context(), &user)
if err != nil {
  panic(err)
}
```

</TabItem>
</Tabs>
