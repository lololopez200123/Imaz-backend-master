const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const guardian = require("../config/guardian");

/*
 * GET
 */
// router.get('/', usuarioController.list);
router.get("/", guardian({}), usuarioController.list);

/*
 * GET
 */

// Send CSRF token for session
router.get("/gtcf", csrfProtection, function(req, res) {
  return res.json({ csrfToken: req.csrfToken() });
});

router.get("/:id", csrfProtection, guardian({}), usuarioController.show);

/*
 * POST
 */
router.post(
  "/mail_pass_check",
  csrfProtection,
  usuarioController.mail_pass_check
);
/*
  Verifica que exista un usuario con el mail indicado, si existe, envía un email directamente al email del usuario con un token especial (especial dado que no sirve para realizar un login) para realizar la recuperación
*/
router.post("/login", usuarioController.login);

router.post("/", csrfProtection, guardian({}), usuarioController.create);

/*
 * PUT
 */
router.put(
  "/ch_pass",
  csrfProtection,
  guardian({ mailToken: true }),
  usuarioController.ch_pass
);
router.put("/:id", csrfProtection, guardian({}), usuarioController.update);
/*
  El guardian valida la existencia de un usuario con _id igual al uid del token especial, de ser así pasa la petición al controlador, este, setea la nueva contraseña de usuario
*/

/*
 * DELETE
 */
router.delete("/:id", csrfProtection, guardian({}), usuarioController.remove);

module.exports = router;
