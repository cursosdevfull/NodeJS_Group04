import {
	DatabaseBootstrap,
	IDatabaseBootstrap,
} from '../../src/bootstrap/database.bootstrap';
import request from 'supertest';
import app from '../../src/app';

const databaseBootstrap: IDatabaseBootstrap = new DatabaseBootstrap();

const tokenInvalid =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const tokenExpired =
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTUwNDEwNDgsImV4cCI6MTYxNTA0MTA0OSwibm9tYnJlIjoiQW5kcmVhIiwiZW1haWwiOiJhbmRyZWFAY29ycmVvLmNvbSIsInJvbGVzIjpbIkFETUlOIiwiT1BFUkFUT1IiXX0.kueHzdGQH49YKUCAJ6xJJOMrPnfg658R9f3v_WCgc6c';

describe('piloto.route.ts', () => {
	beforeAll(async () => {
		await databaseBootstrap.initialize();
	});

	afterAll(() => {
		const connection = databaseBootstrap.getConnection();
		connection.close();
	});

	it('list drivers with token invalid', async () => {
		const response: any = await request(app)
			.get('/drivers')
			.set('Authorization', 'bearer ' + tokenInvalid);

		expect(response.statusCode).toBe(401);
	});

	it('list drivers without token', async () => {
		const response: any = await request(app).get('/drivers');

		expect(response.statusCode).toBe(401);
	});

	it('list drivers with token expired', async () => {
		const response: any = await request(app)
			.get('/drivers')
			.set('Authorization', 'bearer ' + tokenExpired);

		expect(response.statusCode).toBe(409);
	});
});
