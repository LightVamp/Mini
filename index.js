
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const multer = require("multer");
const child_process=require('child_process');
const {exec} = require("child_process");
const http = require('http');

app.use(express.static(path.join(__dirname)));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


app.listen(3000, function() {
    console.log('listening on port 3000')
  });


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  })

  app.get('/upscaler', (req, res) => {
    res.send('upscaler.html')
  })
  app.get('/stats', (req, res) => {
    res.render('form');
  })

    const storage = multer.diskStorage( {
      destination: (req, file, cb)=>{
    
      cb(null, "upscale/realesrgan-ncnn-vulkan-20220424-windows/");
    },
    filename:(req,file,cb) => {
    
      cb(null, file.originalname);
    
    },
    });
    
    const upload = multer({storage});
    app.post('/stats', upload.single('image') , (req,res) => {
      var s=req.body.scale;
      var m=req.body.model;
      var na=req.file.originalname;
      console.log(s);
      console.log(m);
      console.log(na);
      // const command = ("upscale/realesrgan-ncnn-vulkan-20220424-windows/realesrgan-ncnn-vulkan.exe -i " + na + " -o output.png -n " + m + " -s "+ s)
      // const done=this.async();
      exec("start upscale/realesrgan-ncnn-vulkan-20220424-windows/realesrgan-ncnn-vulkan.exe -i upscale/realesrgan-ncnn-vulkan-20220424-windows/"+ na + " -o upscale/realesrgan-ncnn-vulkan-20220424-windows/output.png -n " + m + " -s "+ s ,function(err,stdout,stderr,res){
      console.log(err);
      console.log(stdout);
      console.log(stderr);
      app.get('/upscale/realesrgan-ncnn-vulkan-20220424-windows/output.png', (req, res) => {
        // res.set("Content-Type", "image/png");
        res.sendFile('upscale/realesrgan-ncnn-vulkan-20220424-windows/output.png',{ root: __dirname }, (err) => {
      if (err) throw err;
  
  });
      // res.download("upscale/realesrgan-ncnn-vulkan-20220424-windows/output.png");
    
      // const child = child_process.exec(command);
      // done();
      // res.send('Image uploaded successfully');
      
      // res.download("upscale/realesrgan-ncnn-vulkan-20220424-windows/" , 'output.png');
      
    // console.log("/realesrgan-ncnn-vulkan.exe -i " + na + " -o output.png -n " + m + " -s "+ s);
    // app.get('download', (req, res) => {
      // res.render('form');
     
    // });
  });
      console.log('The file has been sent to the user!');
    
  });
    
  });
  // POST method route
  app.post('/about', (req, res) => {
    res.send('about.html')
  })
  
 