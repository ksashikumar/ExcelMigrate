# ExcelMigrate

ExcelMigrate is a express based node app to import data to MongoDB from excel sheet.

### Demo 

[URL](https://excelmigrate.herokuapp.com/)

### Requirements
- Node >= 8.3
- MongoDB 3.4
- Yarn 1.3.2

### Installation

All configuration values are present in `.env` file. After cloning the repo, change the name of `.env.sample` to `.env` and set `MONGO_HOST` variable.

```sh
$ git clone git@github.com:ksashikumar/ExcelMigrate.git
$ cd ExcelMigrate
$ yarn
$ yarn start
```

`yarn start` will run the app by default in [`http://localhost:3000`](http://localhost:3000). This can be configured in `.env`.

The app can also be run as a CLI tool.

```sh
$ yarn cli path/to/source/excelfile.xlsx
```

will run the app in headless mode.
