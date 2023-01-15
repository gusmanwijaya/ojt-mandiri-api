const express = require("express");
const router = express.Router();

const { authenticationUser } = require("../../../middlewares/authentication");
const { getProducts, createProduct, destroyProduct } = require("./controller");

router.use(authenticationUser);

router.post("/:id/create", createProduct);
router.get("/:id/get", getProducts);
router.delete("/:companyId/:productId/destroy", destroyProduct);

module.exports = router;
