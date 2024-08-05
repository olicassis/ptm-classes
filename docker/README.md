# Docker

## How to run

```
$ docker-compose -f docker-compose.yml up
```

If you find some errors related to volume directories access when running the docker-compose file, run the commands below:

```
$ docker-compose down
```

```
$ rm -rf ./data ./logs
```

```
$ mkdir -p ./data ./logs
```

```
$ chown -R 70:70 ./data ./logs
```

```
$ chmod -R 755 ./data ./logs
```

```
$ docker-compose --env-file ../.env -f docker-compose.yml up
```
