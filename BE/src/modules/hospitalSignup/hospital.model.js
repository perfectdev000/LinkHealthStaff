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
    avatar: {
      type: String,
      default: ''
    },
    badge: {
      type: Boolean,
      default: true
    },
    hiringRole: { type: String, trim: true },
    healthCareInstitution: {
      name: { type: String, trim: true },
      size: { type: String, trim: true },
      website: { type: String, trim: true },
    },

    corporateAddress: [{
      zipCode: { type: String, trim: true },
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
    }],

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
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    agreement: {
      text: { type: String, trim: true },
      signedOn: {
        type: Date,
        default: Date.now,
      },
    },
    activeContracts: {type: String, default: '0', trim: true},
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ]
  },
  {
    timestamps: true,
  }
);

//*********GENERATE AUTH TOKEN WHEN HOSPITAL IS CREATED**************** */
userSchema.methods.generateAuthToken = async function () {
  const hospital = this;
  const token = jwt.sign({ _id: hospital._id.toString(), password: hospital.password }, process.env.JWT_SECRET, {
    expiresIn: 60 * 100,
  });

  hospital.tokens = [{token}];//hospital.tokens.concat({ token });
  await hospital.save();
  return token;
};

//*******************Authenticate the hospital from Database************************** */
userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const hospital = await Hospital.findOne({ email });
    // if (!hospital) {
    //   throw new Error("User not found");
    // }
    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      throw new Error("Unable to Login");
    }
    return hospital;
  } catch (err) {
    return "Password Error";
  }
};

//**********HASH PASSWORDS BEFORE SAVING THE DATA************ */
userSchema.pre("save", async function (next) {
  const hospital = this;
  if (hospital.isModified("password")) {
    hospital.password = await bcrypt.hash(
      hospital.password,
      parseInt(process.env.ROUNDS)
    );
  }
  next();
});

module.exports = Hospital = Mongoose.model("Hospital", userSchema);