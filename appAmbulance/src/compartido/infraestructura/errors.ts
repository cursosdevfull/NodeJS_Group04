import { NextFunction, Request, Response } from 'express';

export interface IError extends Error {
	status?: number;
}

export class Errors {
	static asyncError(
		ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>
	) {
		return (req: Request, res: Response, next: NextFunction) => {
			ftn(req, res, next).catch(err => {
				let error: IError;

				if (err.code) {
					error = new Error('Database error');
					error.message = err.name;
					error.stack = err;
					error.status = 500;
				} else {
					error = new Error('Async Error');
					error.message = err.message;
					error.stack = err.stack;
					error.status = err.status;
				}

				next(error);
			});
		};
	}

	static pathNotFoundError(req: Request, res: Response, next: NextFunction) {
		const err: IError = new Error('Path not found');
		err.status = 404;
		next(err);
	}

	static genericError(
		err: IError,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const objError: IError = {
			name: err.name,
			status: err.status,
			message: err.message,
		};

		if (process.env.NODE_ENV === 'development') {
			objError.stack = err.stack;
		}

		res.status(err.status).json(objError);
	}
}
