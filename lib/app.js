"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = process.env.PORT || 3000;
app.use(_express.default.json()); //section for parcel

var parcels = [];
app.get('/', function (req, res) {
  res.status(200).send('Welcome to sendIT');
});
app.post('/api/v1/parcels', function (req, res) {
  var parcel = {
    id: parcels.length + 1,
    userId: req.body.userId,
    weight: req.body.weight,
    pickupLocation: req.body.pickupLocation,
    destination: req.body.destination,
    status: req.body.status,
    createdDate: _moment.default.now(),
    modifiedDate: _moment.default.now()
  };

  if (!parcel.userId && !parcel.weight && !parcel.pickupLocation && !parcel.destination && !parcel.status) {
    return res.status(400).send('message: all fields are required!');
  }

  parcels.push(parcel);
  return res.status(201).send(parcel);
});
app.get('/api/v1/parcels', function (req, res) {
  res.status(200).send(parcels);
});
app.get('/api/v1/parcels/:id', function (req, res) {
  var parcel = parcels.find(function (parcel) {
    return parcel.id === parseInt(req.params.id);
  });

  if (!parcel) {
    return res.status(404).send('The parcel with the given ID was not found');
  }

  res.send(parcel);
});
app.put('/api/v1/parcels/:id/cancel', function (req, res) {
  var parcel = parcels.find(function (parcel) {
    return parcel.id === parseInt(req.params.id);
  });

  if (!parcel) {
    return res.status(404).send('The parcel with the given ID was not found');
  }

  var index = parcels.indexOf(parcel);
  parcels.splice(index, 1);
  return res.status(200).send(parcel);
});
app.put('/api/v1/parcels/:id', function (req, res) {
  var parcel = parcels.find(function (parcel) {
    return parcel.id === parseInt(req.params.id);
  });
  if (!parcel) return res.status(404).send('The parcel with the given ID was not found');
  parcel.userId = req.body.userId;
  parcel.weight = req.body.weight;
  parcel.pickupLocation = req.body.pickupLocation;
  parcel.destination = req.body.destination;
  parcel.status = req.body.status;
  return res.status(201).send(parcel);
});
app.listen(port, function () {
  console.log("app is listening on ".concat(port));
});
var _default = app;
exports.default = _default;