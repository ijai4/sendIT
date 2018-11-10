import express from 'express';
import moment from 'moment'

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

//section for parcel
const parcels = [];

// index route
app.get('/', (req, res) => {
	res.status(200).send('Welcome to sendIT');
});

//create parcel route
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


//user section
const users = [];

app.post('/api/v1/users', (req, res) => {
	const user = {
		id: users.length + 1,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		createdDate: moment.now(),
		modifiedDate: moment.now()
	};
	if(!user.username && !user.email && !user.password){
		return res.status(400).send('message: all fields are required!');
	}
	users.push(user);
	return res.status(201).send(user);
});

app.get('/api/v1/users/:id/parcels', (req, res) => {
	const allParcels = parcels;

	const userParcels = allParcels.filter((parcel) => parcel.userId === parseInt(req.params.id));
	if(!userParcels) {
		return res.status(404).send('No parcel was found for this user');
	}
	return res.status(200).send(userParcels);
});


app.put('/api/v1/users/:id/cancel', (req, res) => {
	const user = users.find((user) => user.id === parseInt(req.params.id));
	if(!user) {
		return res.status(404).send('The user with the given ID was not found');
	}	
	const index = users.indexOf(user);
	users.splice(index, 1);

	return res.status(200).send(user);
});




app.listen(port, () => {
	console.log(`app is listening on ${port}`);
});

export default app;