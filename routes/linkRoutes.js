const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController.js");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const guardian = require("../config/guardian");

/*
 * GET
 */
router.get("/", linkController.list);

/*
 * GET
 */
router.get("/:id", linkController.show);

/*
 * POST
 */
router.post("/", csrfProtection, guardian({}), linkController.create);

/*
 * PUT
 */
router.put("/:id", csrfProtection, guardian({}), linkController.update);

/*
 * DELETE
 */
router.delete("/:id", csrfProtection, guardian({}), linkController.remove);

module.exports = router;
