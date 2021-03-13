import { NextFunction, Request, Response } from 'express';
import { MessagesError } from '../errors';
import { Responses } from '../responses';

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
				Responses.sentUserForbidden(res, MessagesError.USER_FORBIDDEN);
			}
		};
	}
}

// AutorizacionGuard.canActivate(["ADMIN", "MEDIC"])
// AutorizacionGuard.canActivate("ADMIN", "MEDIC")
