import request from 'supertest';
import chai from 'chai';
import { expect } from 'chai';
import app from '../app';

describe('Test routes', () => {

	const data = {
		userId: 1,
		weight: '50kg',
		pickupLocation: 'lagos',
		destination: 'port harcourt',
		status: 'delivered'
	};
	describe ('POST routes', () => {
		it ('should return success code 201', () => {
			return request(app).post('/api/v1/parcels')
			.send(data)
			.then((res) => {
				expect(res.statusCode).to.equal(201);
			})
			.catch((err) => {
				expect(res.statusCode).to.equal(400);
			});
		});
	});

	
	
});



