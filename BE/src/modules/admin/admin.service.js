const Admin = require("./admin.model");
const bcrypt = require("bcrypt");

exports.initDB = async (req, res, next) => {
    try {
        if( ! await Admin.count()){
            var admin = new Admin ({
                name: 'Admin',
                email: 'admindemo@gmail.com',//'femi.osidipe@linkhealthstaff.com',
                phone: '1234567890',
                password: '@U2u2u',
                permissions: ['superadmin']
            });
            admin.save();
        }
    } catch (err) {
        next(err);
    }
}

exports.emailCheck = async (req, res, next) => {
    try {
      const result = await Admin.find({email: req.body.email});
      if(!result.length){
        return res.status(200).send({
          data: [],
          result: "OK",
          token: [],
        });
      } else {
        return res.status(200).send({
          data: result.length,
          result: "REPEAT",
          token: [],
        });
      }
    } catch (err) {
      next(err);
    }
  }
  
  exports.doSignup = async (req, res, next) => {
    try {
      const admin = new Admin(req.body);
      const result = await admin.save();
      const token = await admin.generateAuthToken();
  
      if (!result) {
        return res.status(500).send({
          data: [],
          Message: "Cannot Save User",
          token: [],
        });
      }
      result['tokens'] = null;
      result['password'] = null;
      return res.status(200).send({
        data: result,
        Message: "User Created Successfully",
        token: token,
      });
    } catch (err) {
      next(err);
    }
  };

  exports.doLogin = async (req, res, next) => {
    try {
      const admin = await Admin.findByCredentials(
        req.body.email,
        req.body.password
      ); 
      
      console.log(admin);
      
      if(admin !== 'Password Error'){
        let token = await admin.generateAuthToken();
        if (!admin && !token) {
          return res.status(500).send({
            data: [],
            Message: "Something went Wrong..",
            token: [],
          });
        }
        admin['tokens'] = null;
        admin['password'] = null;
        return res.status(200).send({
          data: admin,
          Message: "Logged in Successfully",
          token: token,
        });
      } else {
        return res.status(200).send({
          data: [],
          Message: "Password Error",
          token: []
        });
      }
    } catch (err) {
      next(err);
    }
  };

  exports.doGetUserById = async (req, res, next) => {
    try {
      const { _id } = req.params;
      const user = await Admin.findById({ _id }).lean();
      if (!user) {
        return res.status(500).send({
          data: [],
          Message: "Something went Wrong..",
        });
      }
      return res.status(200).send({
        data: user,
        Message: "User Fetched Successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  exports.doUpdateUserById = async (req, res, next) => {
    try {
      const { _id } = req.params;
      const query = { _id };
      const update = { ...req.body };
      if(update.password){
          update.password = await bcrypt.hash(
            update.password,
            parseInt(process.env.ROUNDS)
          );
      }
      const result = await Admin.findByIdAndUpdate(query, update, {
        new: true,
      });
  
      if (!result) {
        return res.status(500).send({
          data: [],
          Message: "Cannot Update user..",
          token: []
        });
      }
      result['tokens'] = null;
      result['password'] = null;
      return res.status(200).send({
        data: result,
        Message: "User Updated Successfully",
        token: req.token
      });
    } catch (err) {
      next(err);
    }
  };