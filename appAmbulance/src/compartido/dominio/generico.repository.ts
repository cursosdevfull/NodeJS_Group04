import { MedicoEntity } from '../../medicos/dominio/medico.entity';

export abstract class GenericoRepository<T> {
	abstract getAll(): T[];
	abstract getOne(id: number): T;
	abstract getByPage(pagina: number): T[];
	abstract insert(entidad: T): T;
	abstract update(id: number, entidad: T): T;
	abstract delete(id: number): T;
}
