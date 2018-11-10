import express from 'express';
import moment from 'moment'

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

//section for parcel
const parcels = [];

app.get('/', (req, res) => {
	res.status(200).send('Welcome to sendIT');
});

app.post('/api/v1/parcels', (req, res) => {
	const parcel = {
		id: parcels.length + 1,
		userId: req.body.userId,
		weight: req.body.weight,
		pickupLocation: req.body.pickupLocation,
		destination: req.body.destination,
		status: req.body.status,
		createdDate: moment.now(),
		modifiedDate: moment.now()
	};
	if(!parcel.userId && !parcel.weight && !parcel.pickupLocation && !parcel.destination && !parcel.status){
		return res.status(400).send('message: all fields are required!');
	}
	parcels.push(parcel);
	return res.status(201).send(parcel);
});

app.get('/api/v1/parcels', (req, res) => {
	res.status(200).send(parcels);
}); 

app.get('/api/v1/parcels/:id', (req, res) => {
	const parcel = parcels.find((parcel) => parcel.id === parseInt(req.params.id));
	if(!parcel) {
		return res.status(404).send('The parcel with the given ID was not found');
	}
	res.send(parcel);
});

app.put('/api/v1/parcels/:id/cancel', (req, res) => {
	const parcel = parcels.find((parcel) => parcel.id === parseInt(req.params.id));
	if(!parcel) {
		return res.status(404).send('The parcel with the given ID was not found');
	}	
	const index = parcels.indexOf(parcel);
	parcels.splice(index, 1);

	return res.status(200).send(parcel);
});

app.put('/api/v1/parcels/:id', (req, res) => {
	const parcel = parcels.find((parcel) => parcel.id === parseInt(req.params.id));
	if (!parcel) return res.status(404).send('The parcel with the given ID was not found');

    parcel.weight = req.body.weight;
    parcel.pickupLocation = req.body.pickupLocation;
    parcel.destination = req.body.destination;
    parcel.status = req.body.status;
    return res.status(201).send(parcel);
}); 

app.listen(port, () => {
	console.log(`app is listening on ${port}`);
});

export default app;