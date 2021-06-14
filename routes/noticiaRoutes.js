var express = require("express");
var router = express.Router();
var noticiaController = require("../controllers/noticiaController.js");
var guardian = require("../config/guardian");

/*
 * GET
 */
router.get("/", noticiaController.list);

/*
 * GET
 */
router.get("/:id", noticiaController.show);

/*
 * POST
 */
router.post("/", guardian({}), noticiaController.create);

/*
 * PUT
 */
router.put("/:id", guardian({}), noticiaController.update);

/*
 * DELETE
 */
router.delete("/:id", guardian({}), noticiaController.remove);

module.exports = router;
