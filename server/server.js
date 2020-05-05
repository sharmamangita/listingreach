// Get dependencies
require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const multer = require('multer'); //middleware for uploading files
const cors = require('cors');
//var common = require("./server/config/routes/CommonRoutes");
var UserController = require("./node/controllers/UserController");
var UserBusiness = require("./node/app/business/UserBusiness");
var schedule = require('node-schedule');

// Get our API routes
var BaseRoutes = require("./node/config/routes/Routes");
const app = express();
// Parsers for POST data
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// var wkhtmltopdf = require('wkhtmltopdf');  // for generate pdf .. impeletemented in InstalmentBusiness.ts

// var watermark = require('image-watermark');   not in use
// var pdf = require('pdf-write-page');

// var htmlToPdf = require('html-to-pdf');
// htmlToPdf.setDebug(true);

//var pdf = require('html-pdf');
var fs = require('fs');
var conversion = require("phantom-html-to-pdf")({
	phantomPath: "/usr/local/bin/phantomjs"
});

// var page = require('webpage').create();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// specify the folder for uploads
app.use("/uploads",express.static(path.join(__dirname, 'public/upload')));
//When a POST request hits the /uploadphysicaldocument endpoint Multer will place the files in the uploads directory. 
  var storage = multer.diskStorage({ //multers disk storage settings
    destination: "./public/upload/",
	  filename: function(req, file, cb){
       console.log("file.originalname====",file.originalname);
        cb(null,"file-" + Date.now() + path.extname(file.originalname));
     }
	});
  var upload = multer({ //multer settings
     storage: storage
  }).array('myImage',3);
  //expose the upload endpoint .. it is using in "applicationtask.service.ts"
  app.post("/uploads", function (req, res) {
    console.log("in multer request");
    upload(req,res,function(err,data){
        if(err){
            console.log(err);
            res.json({error_code:1,result:err});
            return;
        }
        let path = req.files.path;
        console.log("path===",path);
        var common = new UserController();
        var _userBusiness = new UserBusiness();
        _userBusiness.verifyToken(req, res, (userdata) => {
          console.log(":dsdsad====",userdata._id);
          common.upload(req.files,userdata._id, res);
        });
        console.log(":dsdsad====END");
        //return res.json({error_code:0,result:path}); 
    });
  });

 /* update profile */
 var storage1 = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null,"file-" +  Date.now() +path.extname(file.originalname))
    }
})

var upload1 = multer({ storage: storage1 }).single('myImage')

app.post('/updatedupload',function(req, res) {
  upload1(req, res, function (err) {
    let path = req.file.path;
    if (err) {
      return res.status(500).json(err)
    } else {
        var common = new UserController();
        var _userBusiness = new UserBusiness();
      _userBusiness.verifyToken(req, res, (userdata) => {
        console.log(":dsdsad====",userdata._id);
        common.updateprofilepic(req.file,userdata._id, res);
      });

    }
  });

});
   
app.post('/coverupload',function(req, res) {
    upload1(req, res, function (err) {
		let path = req.file.path;
		if (err) {
			return res.status(500).json(err)
			} else {
						var common = new UserController();
      var _userBusiness = new UserBusiness();
      _userBusiness.verifyToken(req, res, (userdata) => {
        console.log(":dsdsad====1212",userdata._id);
        common.updatecoverupload(req.file,userdata._id, res);
    });
			
		}
   });
 });
/* update profile */





// Set our api routes
app.use('/', new BaseRoutes().routes);

//only for live
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
})

// Catch all other routes except uploads folder and return the index file
app.get('^(?!public).*$', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

if(process.env.SSL && process.env.SSL=="ON") {
	const options = {
		key: fs.readFileSync(process.env.SSL_CERTIFICATE_KEYFILE),
		cert: fs.readFileSync(process.env.SSL_CERTIFICATE_FILE)
	};
	if(process.env.SSL_CERTIFICATE_CHAINFILE) {
		options['ca'] = fs.readFileSync(process.env.SSL_CERTIFICATE_CHAINFILE);
	}
	https.createServer(options, app).listen(443, function(){
		console.log('Server started on port 443');
	});
	http.createServer(function (req, res) {
		res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
		res.end();
	}).listen(80);
} else {
	//Create HTTP server.
	const server = http.createServer(app);
	//Listen on provided port, on all network interfaces.
	server.listen(port, () => console.log(`API running on localhost:${port}`));
}

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});