import {
	DatabaseBootstrap,
	IDatabaseBootstrap,
} from './bootstrap/database.bootstrap';
import {
	IServerBootstrap,
	ServerBootstrap,
} from './bootstrap/server.bootstrap';
import app from './app';

const start = async () => {
	const databaseBootstrap: IDatabaseBootstrap = new DatabaseBootstrap();
	const serverBootstrap: IServerBootstrap = new ServerBootstrap(app);

	try {
		await databaseBootstrap.initialize();
		await serverBootstrap.initialize();
	} catch (error) {
		console.log('Error', error);
	}
};

start();
