const express = require("express");
const router = express.Router();

const { authenticationUser } = require("../../../middlewares/authentication");
const { dashboard } = require("./controller");

router.use(authenticationUser);

router.get("/get", dashboard);

module.exports = router;
