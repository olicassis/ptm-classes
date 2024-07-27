# TYPEORM DB PACKAGE

## To create a migration:

```
npm run migration:create src/migrations/<migration_name>
```

Example:

```
npm run migration:create src/migrations/Profile
```

## To run all migrations


```
npm run migrations
```

## To revert last migration


```
npm run migrations:revert
```