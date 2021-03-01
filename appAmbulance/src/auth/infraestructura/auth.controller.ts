import { Request, Response } from 'express';
import { AuthUseCase } from '../aplicacion/auth.usecase';
import { UsuarioModel } from '../../usuarios/dominio/usuario.model';
import { Responses } from '../../compartido/infraestructura/responses';

export class AuthController {
	constructor(private readonly usecase: AuthUseCase) {
		this.login = this.login.bind(this);
		this.getNewAccessToken = this.getNewAccessToken.bind(this);
	}

	async login(req: Request, res: Response) {
		const user: Partial<UsuarioModel> = {
			correo: req.body.email,
			password: req.body.password,
		};

		const tokens = await this.usecase.login(user);

		if (tokens) {
			return res.json(tokens);
		}

		res.status(401).send('Credentials are invalid');
	}

	async getNewAccessToken(req: Request, res: Response) {
		const user: Partial<UsuarioModel> = {
			refreshToken: req.body.refreshToken,
		};

		const tokens = await this.usecase.getNewAccessToken(user);

		if (tokens) {
			return res.json(tokens);
		}

		Responses.sentUserNotAuthenticated(
			res,
			'User not found. Credentials are invalid'
		);
	}
}
