import { NextFunction, Request, Response } from 'express';

export class AutorizacionGuard {
	static canActivate(...rolesAllowed: string[]) {
		return (req: Request, res: Response, next: NextFunction) => {
			const { roles } = res.locals.payload;

			let roleMatched = false;

			for (const rol of roles) {
				if (rolesAllowed.indexOf(rol) > -1) {
					roleMatched = true;
					next();
					break;
				}
			}

			if (!roleMatched) {
				res.status(409).send('User not authorized');
			}
		};
	}
}

// AutorizacionGuard.canActivate(["ADMIN", "MEDIC"])
// AutorizacionGuard.canActivate("ADMIN", "MEDIC")
