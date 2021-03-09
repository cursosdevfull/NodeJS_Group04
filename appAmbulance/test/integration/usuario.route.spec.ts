import {
	DatabaseBootstrap,
	IDatabaseBootstrap,
} from '../../src/bootstrap/database.bootstrap';
import request from 'supertest';
import app from '../../src/app';

const databaseBootstrap: IDatabaseBootstrap = new DatabaseBootstrap();

const tokenValido =
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTUwNDIxNTgsImV4cCI6MTYxNTA0Mzk1OCwibm9tYnJlIjoiQW5kcmVhIiwiZW1haWwiOiJhbmRyZWFAY29ycmVvLmNvbSIsInJvbGVzIjpbIkFETUlOIiwiT1BFUkFUT1IiXX0.zd3tQbL-tLQOeFF-s6munGMW0yqa9latyOA3DY88skA';

const idUser = 1;

describe('user.route.ts', () => {
	beforeAll(async () => {
		await databaseBootstrap.initialize();
	});

	afterAll(() => {
		const connection = databaseBootstrap.getConnection();
		connection.close();
	});

	it('get user with token valid and id valid', async () => {
		const response: any = await request(app)
			.get('/users/' + idUser)
			.set('Authorization', 'bearer ' + tokenValido);

		expect(response.body).toHaveProperty('id', idUser);
		expect(response.body).toHaveProperty('nombre');
		expect(response.body).toHaveProperty('correo');
		expect(response.body).toHaveProperty('password');
		expect(response.body).toHaveProperty('refreshToken');
		expect(response.body).toHaveProperty('activo');

		expect(response.statusCode).toBe(200);
	});

	it('get user with token valid and id invalid', async () => {
		const response: any = await request(app)
			.get('/users/abc')
			.set('Authorization', 'bearer ' + tokenValido);

		expect(response.statusCode).toBe(411);
	});
});
