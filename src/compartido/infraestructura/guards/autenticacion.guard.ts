import { NextFunction, Request, Response } from 'express';
import { MessagesError } from '../errors';
import { Responses } from '../responses';
import { Tokens } from '../token';

export class AutenticacionGuard {
	static canActivate(req: Request, res: Response, next: NextFunction) {
		const headers = req.headers;
		const authorization: string = headers['authorization'];
		// Authorization: bearer xxxxxxx
		if (authorization) {
			const partsAuthorization = authorization.split(' ');
			if (partsAuthorization.length < 2) {
				Responses.sentUserNotAuthenticated(res, MessagesError.USER_NOT_LOGGED);
			} else {
				const accessToken = partsAuthorization[1];
				Tokens.validateAccessToken(accessToken).then(
					payload => {
						res.locals.payload = payload;
						next();
					},
					(error: { status: number; message: string }) => {
						if (error.status === 401) {
							Responses.sentUserNotAuthenticated(res, error.message);
						} else {
							Responses.sentUserForbidden(res, error.message);
						}
						// res.status(error.status).send(error.message);
					}
				);
			}
		} else {
			Responses.sentUserNotAuthenticated(res, MessagesError.USER_NOT_LOGGED);
		}
	}
}
