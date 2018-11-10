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
	if(!parcel.weight){
		return res.status(400).send('message: cannot be empty!');
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

app.listen(port, () => {
	console.log(`app is listening on ${port}`);
});

export default app;