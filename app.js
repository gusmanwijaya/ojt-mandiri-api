const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// START: Import install package
const cors = require("cors");
// END: Import install package

// START: Import router
const usersRouter = require("./app/api/v1/users/router");
const authenticationsRouter = require("./app/api/v1/authentications/router");
const companiesRouter = require("./app/api/v1/companies/router");
const productsRouter = require("./app/api/v1/products/router");
const dashboardsRouter = require("./app/api/v1/dashboards/router");
// END: Import router

// START: Import middleware handle error
const notFound = require("./app/middlewares/not-found");
const handleError = require("./app/middlewares/handle-error");
// END: Import middleware handle error

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const apiVersion = "/api/v1";
app.use(`${apiVersion}/users`, usersRouter);
app.use(`${apiVersion}/auth`, authenticationsRouter);
app.use(`${apiVersion}/companies`, companiesRouter);
app.use(`${apiVersion}/products`, productsRouter);
app.use(`${apiVersion}/dashboards`, dashboardsRouter);

app.use(notFound);
app.use(handleError);

module.exports = app;
