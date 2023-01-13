const express= require('express');
const app=express();
const multer = require("multer");

const storage = multer.diskStorage( {
  destination: (req, file, cb)=>{

  cb(null, "/test");
},
filename:(req,file,cb) => {

  cb(null, file.originalname);

},
});

const upload = multer({storage});
app.post('/stats', upload.single(image), (req,res) => {

  res.send('Image uploaded successfully');

});