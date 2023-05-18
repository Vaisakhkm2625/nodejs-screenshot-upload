const express = require('express');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, '/tmp/my-uploads')
    cb(null, __dirname + '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.png')
  }
})
 
var upload = multer({ storage: storage })

// const upload = multer({dest: __dirname + '/uploads'});

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

app.listen(PORT,'0.0.0.0', () => {
    console.log('Listening at ' + PORT );
});

