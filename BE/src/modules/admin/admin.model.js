const Mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid..");
        }
      },
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "Password"');
        }
      },
    },
    permissions: [{
        type: String,
        required: true,
        trim: true
    }],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//*********GENERATE AUTH TOKEN WHEN HOSPITAL IS CREATED**************** */
userSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign({ _id: admin._id.toString(), password: admin.password }, process.env.JWT_SECRET, {
    expiresIn: 60 * 100,
  });

  admin.tokens = [{token}];//hospital.tokens.concat({ token });
  await admin.save();
  return token;
};

//*******************Authenticate the hospital from Database************************** */
userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const admin = await Admin.findOne({ email });
    // if (!hospital) {
    //   throw new Error("User not found");
    // }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error("Unable to Login");
    }
    return admin;
  } catch (err) {
    return "Password Error";
  }
};

//**********HASH PASSWORDS BEFORE SAVING THE DATA************ */
userSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(
      admin.password,
      parseInt(process.env.ROUNDS)
    );
  }
  next();
});

module.exports = Admin = Mongoose.model("Admin", userSchema);