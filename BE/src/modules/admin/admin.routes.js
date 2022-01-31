const router = require("express").Router();
const auth = require("../../middleware/auth");
const _adminService = require("./admin.service");

router.get("/init", _adminService.initDB);
router.post("/login", _adminService.doLogin);
router.post("/emailCheck", _adminService.emailCheck);
router.post("/update/:_id", auth,  _adminService.doUpdateUserById);
router.get("/getById/:_id", auth,  _adminService.doGetUserById);

module.exports = router;