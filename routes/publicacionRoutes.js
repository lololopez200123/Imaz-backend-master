const express = require("express");
const router = express.Router();
const publicacionController = require("../controllers/publicacionController.js");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const guardian = require("../config/guardian");

/*
 * GET
 */
router.get("/", publicacionController.list);

/*
 * GET
 */
router.get("/:id", publicacionController.show);

/*
 * POST
 */
router.post("/", csrfProtection, guardian({}), publicacionController.create);

/*
 * PUT
 */
router.put("/:id", csrfProtection, guardian({}), publicacionController.update);

/*
 * DELETE
 */
router.delete(
  "/:id",
  csrfProtection,
  guardian({}),
  publicacionController.remove
);

module.exports = router;
