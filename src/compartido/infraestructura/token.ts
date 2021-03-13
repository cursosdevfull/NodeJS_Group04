import jwt_simple from 'jwt-simple';
import { v4 as uuidv4 } from 'uuid';
import { UsuarioModel } from '../../usuarios/dominio/usuario.model';
import yenv from 'yenv';
import moment from 'moment';
import { MessagesError } from './errors';
import { MessagesApp } from './constants';

const env = yenv();

export class Tokens {
	static generateAccessToken(user: Partial<UsuarioModel>) {
		const payload = {
			iat: moment().unix(),
			exp: moment().add(env.TOKEN.TIMEOUT, env.TOKEN.UNITS).unix(),
			nombre: user.nombre,
			email: user.correo,
			foto: 'https://cursonode4.s3.us-east-2.amazonaws.com/' + user.foto,
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
				if (error.message.toLowerCase() === MessagesApp.TOKEN_EXPIRED) {
					reject({
						status: 409,
						message: MessagesError.TOKEN_EXPIRED,
					});
				} else {
					reject({
						status: 401,
						message: MessagesError.TOKEN_INVALID,
					});
				}
			}
		});

		return promiseValidate;
	}
}
