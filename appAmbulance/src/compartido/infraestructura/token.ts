import jwt_simple from 'jwt-simple';
import { v4 as uuidv4 } from 'uuid';
import { UsuarioModel } from '../../usuarios/dominio/usuario.model';
import yenv from 'yenv';
import moment from 'moment';

const env = yenv();

export class Tokens {
	static generateAccessToken(user: Partial<UsuarioModel>) {
		const payload = {
			iat: moment().unix(),
			exp: moment().add(env.TOKEN.TIMEOUT, env.TOKEN.UNITS).unix(),
			nombre: user.nombre,
			email: user.correo,
			roles: user.roles.map((el: any) => el.rol),
		};

		const accessToken = jwt_simple.encode(payload, env.TOKEN.KEYWORD_SECRET);
		return accessToken;
	}

	static generateRefreshToken() {
		const refreshToken = uuidv4();
		return refreshToken;
	}

	static validateAccessToken(accessToken: string): Promise<any> {
		const promiseValidate = new Promise((resolve, reject) => {
			try {
				const payload = jwt_simple.decode(
					accessToken,
					env.TOKEN.KEYWORD_SECRET
				);
				resolve(payload);
			} catch (error) {
				if (error.message.toLowerCase() === 'token expired') {
					reject({
						status: 409,
						message: 'Token expired',
					});
				} else {
					reject({
						status: 401,
						message: 'Token invalid',
					});
				}
			}
		});

		return promiseValidate;
	}
}
