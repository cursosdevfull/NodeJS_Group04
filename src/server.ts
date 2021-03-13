import {
	DatabaseBootstrap,
	IDatabaseBootstrap,
} from './bootstrap/database.bootstrap';
import {
	IServerBootstrap,
	ServerBootstrap,
} from './bootstrap/server.bootstrap';
import app from './app';
import { RedisBootstrap } from './bootstrap/redis.bootstrap';

const start = async () => {
	const databaseBootstrap: IDatabaseBootstrap = new DatabaseBootstrap();
	const redisBootstrap: IDatabaseBootstrap = new RedisBootstrap();
	const serverBootstrap: IServerBootstrap = new ServerBootstrap(app);

	try {
		await databaseBootstrap.initialize();
		await redisBootstrap.initialize();
		await serverBootstrap.initialize();
	} catch (error) {
		console.log('Error', error);
	}
};

start();
