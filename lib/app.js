"use strict";

var _express = _interopRequireDefault(require("express"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = process.env.PORT || 3000;
app.use(_express.default.json()); //section for parcel

var parcels = [];
app.get('/', function (req, res) {
  res.status(200).send('..............bla bla');
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

  if (!parcel.weight) {
    return res.status(400).send('message: cannot be empty!');
  }

  parcels.push(parcel);
  return res.status(201).send(parcel);
});
app.listen(port, function () {
  console.log('app is listening on', port);
});