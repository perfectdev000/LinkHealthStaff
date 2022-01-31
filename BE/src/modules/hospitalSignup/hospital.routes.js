const router = require("express").Router();
const auth = require("../../middleware/auth");
const _hospitalService = require("./hospital.service");

router.post("/signup", _hospitalService.doSignup);
router.post("/login", _hospitalService.doLogin);
router.post("/emailCheck", _hospitalService.emailCheck);
router.post("/countByQuery", auth, _hospitalService.countByQuery);
router.post("/getByQuery", auth, _hospitalService.getByQuery);
router.post("/update/:_id", auth,  _hospitalService.doUpdateUserById);
router.get("/getById/:_id", auth,  _hospitalService.doGetUserById);

module.exports = router;
