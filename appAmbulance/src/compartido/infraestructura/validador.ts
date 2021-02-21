import { NextFunction, Request, Response } from 'express';
import { IError } from './errors';

export default class SchemaValidator {
	static generateError(objError: {
		name: string;
		status: number;
		message: string;
		stack: string;
		next: NextFunction;
	}) {
		const err: IError = new Error(objError.name);
		err.status = objError.status;
		err.message = objError.message;
		err.stack = objError.stack;
		objError.next(err);
	}

	static validate(schemaValidation: any) {
		return (req: Request, res: Response, next: NextFunction): Promise<any> => {
			const listContainersOriginParameters = [
				'params',
				'query',
				'body',
				'headers',
			];

			const listValidations: Array<Promise<any>> = [];

			listContainersOriginParameters.forEach((container: string) => {
				if (schemaValidation[container]) {
					switch (container) {
						case 'params':
							listValidations.push(
								schemaValidation[container].validate(req.params)
							);
							break;
						case 'query':
							listValidations.push(
								schemaValidation[container].validate(req.query)
							);
							break;
						case 'body':
							listValidations.push(
								schemaValidation[container].validate(req.body)
							);
							break;
						case 'headers':
							listValidations.push(
								schemaValidation[container].validate(req.headers)
							);
							break;
					}
				}
			});

			return Promise.all(listValidations).then(
				results => {
					const lengthResults = results.length;
					for (let ind = 0; ind < lengthResults; ind++) {
						if (results[ind].error) {
							return SchemaValidator.generateError({
								name: 'Parameters Error',
								message: 'Error in parameters',
								status: 411,
								stack: results[ind].error,
								next,
							});
							// return res.status(411).json(results[ind].error);
						}
					}

					return next();
				},
				error => {
					SchemaValidator.generateError({
						name: 'Parameters Error',
						message: 'Error in parameters',
						status: 411,
						stack: error.error,
						next,
					});
					// res.status(500).send('Error in validation');
				}
			);
		};
	}
}
/* 
schemaValidation: {
	body: {},
	params: {},
	headers: {},
	query: {}
} */
