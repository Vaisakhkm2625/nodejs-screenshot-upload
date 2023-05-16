const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

const app = express();
const PORT = 3000;

var storage = multer.diskStorage(
    {
        destination: './uploads/images',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname+ '-' + Date.now()+".png");
        }
    }
);


app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});
