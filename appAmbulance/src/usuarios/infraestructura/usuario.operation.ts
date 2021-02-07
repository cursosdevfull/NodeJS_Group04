import { getRepository } from 'typeorm';
import GenericoDatabaseRepository from '../../compartido/infraestructura/generico-database.repository';
import { Usuario } from '../../entidades/usuario.entity';
import { UsuarioRepository } from '../dominio/usuario.repository';

export class UsuarioOperation
	extends GenericoDatabaseRepository<Usuario>
	implements UsuarioRepository {
	constructor() {
		super(Usuario);
	}

	async getSearch(): Promise<Usuario[]> {
		const repository = getRepository<Usuario>(Usuario);
		const resultados = await repository.find();
		return resultados;
	}
}
