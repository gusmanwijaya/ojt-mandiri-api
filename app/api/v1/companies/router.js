const express = require("express");
const router = express.Router();

const {
  createCompany,
  getCompanies,
  detailCompany,
  destroyCompany,
  editCompany,
  importCompanies,
} = require("./controller");
const { authenticationUser } = require("../../../middlewares/authentication");
const uploadMiddleware = require("../../../middlewares/multer");

router.use(authenticationUser);

router.post("/create", createCompany);
router.get("/get", getCompanies);
router.get("/detail/:id", detailCompany);
router.delete("/destroy/:id", destroyCompany);
router.patch("/edit/:id", editCompany);
router.post("/import", uploadMiddleware.single("file"), importCompanies);

module.exports = router;
