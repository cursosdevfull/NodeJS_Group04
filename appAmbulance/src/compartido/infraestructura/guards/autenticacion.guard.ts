import { NextFunction, Request, Response } from 'express';
import { Tokens } from '../token';

export class AutenticacionGuard {
	static canActivate(req: Request, res: Response, next: NextFunction) {
		const headers = req.headers;
		const authorization: string = headers['authorization'];
		// Authorization: bearer xxxxxxx
		if (authorization) {
			const partsAuthorization = authorization.split(' ');
			if (partsAuthorization.length < 2) {
				res.status(401).send('User not logged');
			} else {
				const accessToken = partsAuthorization[1];
				Tokens.validateAccessToken(accessToken).then(
					payload => {
						res.locals.payload = payload;
						next();
					},
					(error: { status: number; message: string }) => {
						res.status(error.status).send(error.message);
					}
				);
			}
		} else {
			res.status(401).send('User not logged');
		}
	}
}
