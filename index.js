var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

// Set up CORS and static files
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Configure multer for file uploads
var upload = multer({ dest: 'uploads/' }); // Files will be temporarily stored in 'uploads' directory

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Handle file upload at /api/fileanalyse route
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Prepare response data with file metadata
  const response = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };

  // Respond with the file information
  res.json(response);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
