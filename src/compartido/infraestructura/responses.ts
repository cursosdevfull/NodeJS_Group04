import { Response } from 'express';

export class Responses {
	static notFound(res: Response, message: string = 'Not found') {
		res.status(404).json({
			status: 404,
			message,
		});
	}

	static sentOk(res: Response, result: any | any[], status: number = 200) {
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
