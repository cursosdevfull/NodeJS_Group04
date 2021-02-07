export interface UsuarioModel {
	id: number;
	nombre: string;
	correo: string;
	password: string;
	refreshToken: string;
	activo: boolean;
	roles: any;
}
