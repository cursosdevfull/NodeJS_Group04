import { NextFunction, Request, Response } from 'express';

export default class SchemaValidator {
	static validate(schemaValidation: any) {
		return (req: Request, res: Response, next: NextFunction): Promise<any> => {
			return null;
		};
	}
}
