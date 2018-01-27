# on

[![Greenkeeper badge](https://badges.greenkeeper.io/dwmkerr/on.svg)](https://greenkeeper.io/)

`on` is a simple tool which can help when working with environment variables.

Install with `npm install -g on`. You can then define a set of environments in an `.on.yml` file:

```yml
dev:
  env:
    - DB_HOST=localhost
    - DB_USERNAME=dave
uat:
  env:
    - DB_HOST=uat-cluster.local
    - DB_USERNAME=access-service
```

Now `on` will set these environment variables before running commands:

```bash
# Run scripts...
on dev ./connect.sh

# ...or makefiles...
on uat make deploy

# ...or anything really...
on dev telnet $DB_HOST 27017
```

There's also a few other things you can do which can be very useful when doing doing dev, ops or whatever, these are listed below. 

## Ensure environment variables are set

Sometimes you might want to make sure that an environment variable is set before running a command. Let's say we have a command to backup a database:

```
todo
```

We can configure our `.on.yml` to ensure a password environment variable is present:

```yml
dev:
  env:
    - DB_HOST=localhost
    - DB_USERNAME=dave
    - DB_PASSWORD         # notice we don't set a value
```

If the variable is already set, `on` will use it:

```
$ DB_PASSWORD=123 on dev ./backup.sh
```

If we run a command without the environment variable set, `on` will prompt us to key it in:

```
$ on dev ./backup.sh
Provide a value for DB_PASSWORD: 
```

This can be useful for things like passwords and tokens, where we might want to demand they are present, but don't mind where they come from.

## Run Commands Before Accessing an Environment

You might need to run certain commands to be able to access your environment, such as running a login program. You can specify scripts which will be run after the environment variables are set, but before the commands following `on`.

In this example, I want to login to a Kubernetes cluster before I run any commands on the environment:

```yml
dev:
  env:
    - CLUSTER_HOST=https://dev-cluster.myproject.com
    - CLUSTER_USERNAME=dave
    - CLUSTER_PASSWORD
  script:
   - kubectl login "$CLUSTER_HOST" -u $CLUSTER_USERNAME -p $CLUSTER_PASSWORD
sit:
  env:
    - CLUSTER_HOST=https://sit-cluster.myproject.com
    - CLUSTER_USERNAME=dave
    - CLUSTER_PASSWORD
  script: dev # just use the same scripts as dev
```

Now I can run commands on any one of my environments, by only keying in the password rather than the full login command:

```
$ on dev kubectl get pods
Provide a value for CLUSTER_PASSWORD: ***
```

## TODO

 - [ ] allow `on` to read from `.dev.env` files and similar by default if there is no `.on.yml` file present. makes it useful for projects already using things like `dotenv`
