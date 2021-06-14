const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController.js");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const guardian = require("../config/guardian");

/*
 * GET
 */
router.get("/", categoriaController.list);

/*
 * GET
 */
router.get("/:id", categoriaController.show);

/*
 * POST
 */
router.post("/", csrfProtection, guardian({}), categoriaController.create);

/*
 * PUT
 */
router.put("/:id", csrfProtection, guardian({}), categoriaController.update);

/*
 * DELETE
 */
router.delete("/:id", csrfProtection, guardian({}), categoriaController.remove);

module.exports = router;
