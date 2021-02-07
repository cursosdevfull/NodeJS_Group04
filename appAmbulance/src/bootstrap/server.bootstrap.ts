import http from 'http';
import { AddressInfo } from 'net';
import yenv from 'yenv';
export interface IServerBootstrap {
	initialize(): Promise<any>;
}

interface Address extends AddressInfo {
	port: number;
}

const env = yenv();

export class ServerBootstrap implements IServerBootstrap {
	constructor(private app: any) {}

	initialize(): Promise<any> {
		return new Promise((resolve, reject) => {
			const server = http.createServer(this.app);

			server
				.listen(env.PORT)
				.on('listening', () => {
					resolve(true);
					console.log(
						`Server is running on port ${(server.address() as Address).port}`
					);
				})
				.on('error', err => {
					reject(err);
					console.log(err);
				});
		});
	}
}
