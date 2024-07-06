# Private Teaching Classes - PTM CLASSES

PTM Classes is an application to help private teachers manage their classes. This repository will contain just the backend part of the application.

This project is for learning purposes only.

## What's inside?

This repo includes the following packages/apps:

### Apps and Packages

- `packages`: contains tools to be reused in other modules like utilities, lint and typescript configurations.
- `services`: contains services that will backe the application like BFF and lambda functions.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command at root folder:

```
npm run build
```

### Develop

To develop all apps and packages, run the following command at root folder:

```
npm run dev
```

Other commands can be seen at **package.json** both in root and within each package.

To build or develop code for a specific package you can use:

```
npm run <command> -w <package-folder>
```

Like this:

```
npm run test -w packages/utils
```
