const express = require("express");
const router = express.Router();

const { get, create } = require("./controller");

router.get("/get", get);
router.post("/create", create);

module.exports = router;
