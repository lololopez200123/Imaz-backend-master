const express = require("express");
const router = express.Router();
const falloController = require("../controllers/falloController.js");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const guardian = require("../config/guardian");

/*
 * GET
 */
router.get("/", falloController.list);

/*
 * GET
 */
router.get("/:id", falloController.show);

/*
 * POST
 */
router.post("/", csrfProtection, guardian({}), falloController.create);

/*
 * PUT
 */
router.put("/:id", csrfProtection, guardian({}), falloController.update);

/*
 * DELETE
 */
router.delete("/:id", csrfProtection, guardian({}), falloController.remove);

module.exports = router;
