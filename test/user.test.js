import request from 'supertest';
import chai from 'chai';
import { expect } from 'chai';
import app from '../app';

describe('Users routes', () => {
	const data = {
		id: 1,
		username: 'name',
		email: 'name@gmail.com',
		password: 'lagos'
	};
	
	describe('POST routes', () => {
		it('should return success code 201', () => {
			return request(app).post('/api/v1/users')
			.send(data)
			.then((res) => {
				expect(res.statusCode).to.equal(201);
			})
			.catch((err) => {
				expect(err.statusCode).to.equal(400);
			});
		});
	});

	describe('GET routes', () => {
		it('should return success code 200 and all parcels by a particular user', () => {
			return request(app).get('/api/v1/users/1/parcels')
			.then((res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.be.an('array');
			})
			.catch((err) => {
				expect(err.statusCode).to.equal(400);
			});
		});
	});

	
});