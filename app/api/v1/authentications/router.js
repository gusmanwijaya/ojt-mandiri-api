const express = require("express");
const router = express.Router();

const { signIn } = require("./controller");

router.post("/sign-in", signIn);

module.exports = router;
