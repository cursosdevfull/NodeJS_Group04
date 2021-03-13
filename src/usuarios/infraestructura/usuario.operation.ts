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

	async getAll(
		where: object = {},
		relations: string[] = [],
		order: object = {}
	): Promise<Usuario[]> {
		const repository = getRepository<Usuario>(Usuario);
		const records: Usuario[] = await repository.find({
			where,
			relations,
			order,
		});

		return records;
	}

	async getSearch(): Promise<Usuario[]> {
		const repository = getRepository<Usuario>(Usuario);
		const resultados = await repository.find();
		return resultados;
	}
}
