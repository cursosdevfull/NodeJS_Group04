import http from 'http';
import { AddressInfo } from 'net';

export interface IServerBootstrap {
	initialize(): Promise<any>;
}

interface Address extends AddressInfo {
	port: number;
}

export class ServerBootstrap implements IServerBootstrap {
	constructor(private app: any) {}

	initialize(): Promise<any> {
		return new Promise((resolve, reject) => {
			const server = http.createServer(
				this.app
				/*                 (request, response) => {
				const medics = [
					{
						name: 'José',
					},
					{ name: 'Carmela' },
				];

				response.writeHead(200, {
					'content-type': 'application/json; charset="utf8"',
				});
				response.write(JSON.stringify(medics));
				response.end();
            } */
			);

			server
				.listen(3000)
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
