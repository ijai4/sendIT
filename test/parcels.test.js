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
	describe ('GET routes', () => {
		it ('should return success code 200 for all parcels', () => {
			return request(app).get('/api/v1/parcels')
			.then((res) => {
				expect(res.statusCode).to.equal(200);
			})
			.catch((err) => {
				expect(err.statusCode).to.equal(404);
			});
		});
	});

	
});



