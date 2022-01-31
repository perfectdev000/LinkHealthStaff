require("dotenv/config");
const router = require("express").Router();
const Upload = require("../../common/fileUpload/fileUpload.model");
const AWS = require("aws-sdk");
const multer = require("multer");
const uuid = require("uuid/v4");

var s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: "us-east-2",
});

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const uploads = multer({ storage }).single("media");

router.post("/upload", uploads, async (req, res) => {
  console.log("-----------");
  console.log("file upload started. file name : " + req.file.originalname);
  let myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuid()}.${fileType}`,
    Body: req.file.buffer,
  };

  const result = await s3
    .upload(params, (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })
    .promise();
  const upload = new Upload({
    upload: { link: result.Location, ETag: result.ETag },
  });
  const saveUpload = await upload.save();
  
  console.log("file upload ended.");
  console.log(saveUpload);
  console.log("-----------");

  res
    .status(200)
    .send({ Message: "Upload Successfully..", upload: saveUpload });
});

router.post("/delete", async (req, res) => {
  var link = req.body.link;
  var fileName = link.split('/')[3];
  console.log("-----------");
  console.log("file delete started. file name : " + fileName);
  s3.deleteObject({ 
    Bucket: process.env.AWS_BUCKET_NAME, 
    Key: fileName, 
  }, (err, data) => {
    if(err){
      console.log(err);
      return res.status(500).send(err);
    }
  });
  var result = await Upload.findOneAndDelete({
    'upload.link': link
  });
  console.log(result);
  console.log("file delete ended.");
  console.log("-----------");
  
  res
    .status(200)
    .send({ Message: "Deleted Successfully.."});
});

module.exports = router;
