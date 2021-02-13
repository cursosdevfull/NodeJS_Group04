import { Tokens } from '../../compartido/infraestructura/token';
import { IToken } from '../../compartido/dominio/token.interface';
import { UsuarioModel } from '../../usuarios/dominio/usuario.model';
import { CryptService } from '../../compartido/aplicacion/crypt.service';
import { UsuarioRepository } from '../../usuarios/dominio/usuario.repository';

export class AuthUseCase {
	constructor(public operacion: UsuarioRepository) {}

	async login(user: Partial<UsuarioModel>): Promise<IToken> {
		const existsUser = await this.operacion.getOne({ correo: user.correo }, [
			'roles',
		]);
		if (existsUser) {
			const matchedPassword = await CryptService.decrypt(
				user.password,
				existsUser.password
			);
			if (matchedPassword) {
				const tokens: IToken = {
					accessToken: Tokens.generateAccessToken(existsUser),
					refreshToken: existsUser.refreshToken,
				};

				return tokens;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
}
