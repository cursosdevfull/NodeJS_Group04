import { Request, Response, NextFunction } from 'express';
import { RedisBootstrap } from '../../../bootstrap/redis.bootstrap';
import { Responses } from '../responses';

export class CacheRedis {
	static handle(tagName: string) {
		return async (req: Request, res: Response, next: NextFunction) => {
			let identifier = tagName;

			if (req.query) {
				for (let property in req.query) {
					identifier += '_' + req.query[property];
				}
			}

			if (req.params) {
				for (let property in req.params) {
					identifier += '_' + req.params[property];
				}
			}

			if (req.body) {
				for (let property in req.body) {
					identifier += '_' + req.body[property];
				}
			}

			const results = await RedisBootstrap.get(identifier);
			if (results) {
				Responses.sentOk(res, JSON.parse(results));
			} else {
				res.locals.cacheIdentifier = identifier;
				return next();
			}
		};
	}
}
