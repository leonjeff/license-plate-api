const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
//const excelToJson = require('convert-excel-to-json');

const csvtojsonV2 = require('csvtojson');
const bodyParser = require('body-parser');
const app = express();
const VehicleModel = require('./models/VehicleModel');
const { response } = require('express');
let router = express.Router();

app.use(cors());
app.use(express.static('public'));

const mongoPath =
  'mongodb+srv://root:JFJJj8iYLhXcFftU@licenseplatedb.aw0ja.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoPath, function (err, res) {
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('conectado');
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }).array('file');

app.post('/upload', async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    csvtojsonV2()
      .fromFile('public/vehiclesUpload.csv')
      .then((csvData) => {
        console.log(csvData);
        VehicleModel.insertMany(csvData)
          .then(function () {
            console.log('Data Inserted');
            res.json({ success: 'Success' });
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  });
});

router.post('/add', async (req, res) => {
  csvtojsonV2()
    .fromFile('public/vehiclesUpload.csv')
    .then((csvData) => {
      console.log(csvData);
      VehicleModel.insertMany(csvData)
        .then(function () {
          console.log('Data Inserted');
          res.json({ success: 'Success' });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
});

router.get('/vehicles', async (req, res) => {
  const result = await VehicleModel.find({}).exec();
  res.send(result);
});

router.get('/vehicle/:licensePlate', async (req, res) => {
  const { licensePlate } = req.params;
  const data = await VehicleModel.findOne({ licensePlate: licensePlate })
    .select('licensePlate make model yearOfManufacture')
    .exec();
  res.send(data);
});

router.delete('/vehicle/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await VehicleModel.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

app.use(cors({ origin: true }));
app.use(router);
/*app.listen(process.env.PORT || 5000, function () { console.log('Node server running on http://localhost:3030');});*/
app.listen(3030, function () {
  console.log('Node server running on http://localhost:3030');
});
