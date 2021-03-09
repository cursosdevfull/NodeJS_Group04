import app from '../../src/app';
import { ServerBootstrap } from '../../src/bootstrap/server.bootstrap';

describe('server.ts', () => {
	it('server is up', async () => {
		const server = new ServerBootstrap(app);
		const response = await server.initialize();

		expect(response).toBeTruthy();
	});
});
