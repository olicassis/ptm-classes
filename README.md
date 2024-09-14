# Private Teaching Classes - PTM CLASSES

PTM Classes is an application to help private teachers manage their classes. This repository will contain just the backend part of the application.

This project is for learning purposes only.

### Run locally

To run the app locally setup your **.env** following **.env.example** file. 

- Executes database image:

**OBS**: must have **DB_HOST=db** on **.env** file.

```
docker-compose up -d db
```

- Run dev script:

**OBS**: change **DB_HOST=db** to **DB_HOST=localhost** on **.env** file.

```
npm run dev
```

Other commands can be seen at **package.json**.

If you want to test the application inside a docker container, see instructions on the **README.md** in **docker folder**.
