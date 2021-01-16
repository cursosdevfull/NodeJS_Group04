import { GenericoRepository } from '../../compartido/dominio/generico.repository';
import { MedicoEntity } from '../dominio/medico.entity';

export class MedicoUseCase {
	constructor(private operacion: GenericoRepository<MedicoEntity>) {}

	getAll(): MedicoEntity[] {
		return this.operacion.getAll();
	}

	getOne(id: number): MedicoEntity {
		return this.operacion.getOne(id);
	}

	getByPage(pagina: number): MedicoEntity[] {
		return this.operacion.getByPage(pagina);
	}

	insert(entidad: MedicoEntity): MedicoEntity {
		return this.operacion.insert(entidad);
	}

	update(id: number, entidad: MedicoEntity): MedicoEntity {
		return this.operacion.update(id, entidad);
	}

	delete(id: number): MedicoEntity {
		return this.operacion.delete(id);
	}
}
