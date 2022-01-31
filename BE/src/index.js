const path = require("path");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
const app = express();
const port = process.env.PORT || 3000;

/**************NECESSARY INCLUDES*********** */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//**********IMPORTING ROUTES********* */
const errorrController = require("./middleware/errorHandler");
const staffSignUpRoutes = require("./modules/staffSignup/signup.routes");
const hospitalSignUpRoutes = require("./modules/hospitalSignup/hospital.routes");
const adminRoutes = require("./modules/admin/admin.routes");
const fileUpload = require("./modules/common/fileUpload/fileUpload.routes");
const other = require("./modules/common/zipToAddress/zipToAddress.routes");

//*****************USING THE ROUTES************************* */

app.use("/v1/LHS/staff", staffSignUpRoutes);
app.use("/v1/LHS/hospital", hospitalSignUpRoutes);
app.use("/v1/LHS/admin", adminRoutes);
app.use("/v1/LHS/file", fileUpload);
app.use("/v1/LHS/other", other);

app.use(errorrController);
app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../public/')});
});
//*************************************************************/

app.listen(port, () => {
  console.log("*************************************************************");
  console.log(
    `Server is up on port ${port}! Started at ${new Date().toUTCString()}`
  );
  console.log(`*************************************************************`);
});
