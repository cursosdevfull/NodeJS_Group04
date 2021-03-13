import { Response } from 'express';
import { RedisBootstrap } from '../../bootstrap/redis.bootstrap';

export class Responses {
	static notFound(res: Response, message: string = 'Not found') {
		res.status(404).json({
			status: 404,
			message,
		});
	}

	static async sentOk(
		res: Response,
		result: any | any[],
		status: number = 200
	) {
		if (res.locals.cacheIdentifier) {
			await RedisBootstrap.set(
				res.locals.cacheIdentifier,
				JSON.stringify(result)
			);
		}
		res.status(status).json({
			status: status,
			result,
		});
	}

	static sentUserNotAuthenticated(
		res: Response,
		message: string = 'User is not authenticated'
	) {
		res.status(401).json({
			status: 401,
			message,
		});
	}

	static sentUserForbidden(res: Response, message: string = 'User forbidden') {
		res.status(409).json({
			status: 409,
			message,
		});
	}
}
