const User = require("./signup.model");
const bcrypt = require("bcrypt");

exports.emailCheck = async (req, res, next) => {
  try {
    const result = await User.find({email: req.body.email});
    if(!result.length){
      return res.status(200).send({
        data: [],
        result: "OK",
        token: [],
      });
    } else {
      return res.status(200).send({
        data: [],
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
    const user = new User(req.body);
    const result = await user.save();
    const token = await user.generateAuthToken();

    if (!result) {
      return res.status(500).send({
        data: [],
        Message: "Cannot Save User",
        token: [],
      });
    }
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
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log(user);

    if(user !== 'Password Error'){
      let token = await user.generateAuthToken();
      if (!user && !token) {
        return res.status(500).send({
          data: [],
          Message: "Something went Wrong..",
          token: [],
        });
      }
      return res.status(200).send({
        data: user,
        Message: "Logged in Successfully",
        token: token,
      });
    } else {      
      return res.status(200).send({
        data: [],
        Message: "Password Error",
        token: [],
      });
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.doGetUserById = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await User.findById({ _id }).lean();
    delete user["password"];
    delete user["token"];
    if (!user) {
      return res.status(500).send({
        data: [],
        Message: "Something went Wrong..",
        token: ''
      });
    }
    return res.status(200).send({
      data: user,
      Message: "User Fetched Successfully",
      token: req.token
    });
  } catch (err) {
    next(err);
  }
};

exports.doUpdateUserById = async (req, res, next) => { console.log(req.params);
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
    const result = await User.findByIdAndUpdate(query, update, {
      new: true,
    });

    if (!result) {
      return res.status(500).send({
        data: [],
        Message: "Cannot Update user..",
        token: []
      });
    }
    // const token = await result.generateAuthToken();
    result["password"] = null;
    result["token"] = null;
    return res.status(200).send({
      data: result,
      Message: "User Updated Successfully",
      token: req.token
    }); 
  } catch (err) {
    next(err);
  }
};

exports.getByQuery = async (req, res, next) => {
  try { console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const sortByName = req.body.sortByName;
    const curPage = req.body.curPage;
    var skip = 5 * (curPage - 1);
    var query = User.find();
    query.where({ "email": { '$regex' : email, '$options' : 'i' } });
    query.where({ "name": { '$regex' : name, '$options' : 'i' } });
    query.collation({'locale':'en'});
    query.sort({name: sortByName});
    query.skip(skip).limit(5);
    var result = await query.exec();
    var total = await User.count();
    var data = {
      total: total,
      staffs: result
    }
    return res.status(200).send({
      data: data,
      Message: "Successfully Get Staffs",
      token: req.token
    }); 
  } catch (err) {
    next(err);
  }
}

exports.countByQuery = async (req, res, next) => {
  try { 
    var date = new Date(req.body.date);
    var d = date.getDate();
    var m= date.getMonth() + 1;
    var y = date.getFullYear();
    var gte = y + '-' + m + '-' + d;
    var lt = y + '-' + m + '-' + (d+1);
    var result = await User.count({
      createdAt: {
         $gte: new Date(gte), 
        $lt: new Date(lt)
      }
    });
    var total = await User.count();
    var data = {
      total: total,
      new: result
    }
    return res.status(200).send({
      data: data,
      Message: "Successfully Count Staffs",
      token: req.token
    }); 
  } catch (err) {
    next(err);
  }
}

exports.doDeleteUserById = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
