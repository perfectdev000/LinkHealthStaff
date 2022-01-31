const jwt = require("jsonwebtoken");
const StaffUser = require("../modules/staffSignup/signup.model");
const HospitalUser = require("../modules/hospitalSignup/hospital.model");
const AdminUser = require("../modules/admin/admin.model");

const auth = async (req, res, next) => {
  try {
    var type = req.header("Authorization").split("_kackey_");
    const token = type[1];
    type = type[0];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    var user;
    if(type === 'hospital'){
      user = await HospitalUser.findOne({
        _id: decoded._id,
        password: decoded.password
      });
    } else if (type === 'staff') {
      user = await StaffUser.findOne({
        _id: decoded._id,
        password: decoded.password
      });
    } else if (type === 'admin') {
      user = await AdminUser.findOne({
        _id: decoded._id,
        password: decoded.password
      });
    }

    if (!user) {
      throw new Error();
    } else {
      req.token = await user.generateAuthToken();
      req.user = user;
      next();
    }
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
