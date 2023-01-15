const express = require("express");
const router = express.Router();

const {
  createCompany,
  getCompanies,
  detailCompany,
  destroyCompany,
  editCompany,
} = require("./controller");
const { authenticationUser } = require("../../../middlewares/authentication");

router.use(authenticationUser);

router.post("/create", createCompany);
router.get("/get", getCompanies);
router.get("/detail/:id", detailCompany);
router.delete("/destroy/:id", destroyCompany);
router.patch("/edit/:id", editCompany);

module.exports = router;
