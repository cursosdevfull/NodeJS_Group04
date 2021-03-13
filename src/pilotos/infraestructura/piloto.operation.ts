import { getRepository } from 'typeorm';
import GenericoDatabaseRepository from '../../compartido/infraestructura/generico-database.repository';
import { Piloto } from '../../entidades/piloto.entity';
import { PilotoRepository } from '../dominio/piloto.repository';

export class PilotoOperation
	extends GenericoDatabaseRepository<Piloto>
	implements PilotoRepository {
	constructor() {
		super(Piloto);
	}

	async getSearch(): Promise<Piloto[]> {
		const repository = getRepository<Piloto>(Piloto);
		const resultados = await repository.find();
		return resultados;
	}
}
