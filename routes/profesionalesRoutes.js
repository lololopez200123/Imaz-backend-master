var express = require("express");
var router = express.Router();
var profesionalController = require("../controllers/profesionalController.js");
var guardian = require("../config/guardian");

/*
 * GET
 */
router.get("/", profesionalController.list);

/*
 * GET
 */
router.get("/:id", profesionalController.show);

/*
 * POST
 */
router.post("/", guardian({}), profesionalController.create);

/*
 * PUT
 */
router.put("/:id", guardian({}), profesionalController.update);

/*
 * DELETE
 */
router.delete("/:id", guardian({}), profesionalController.remove);

module.exports = router;
