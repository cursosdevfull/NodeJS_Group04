import { GenericoRepository } from '../dominio/generico.repository';

export default class GenericoUseCaseRepository<
	T,
	U extends GenericoRepository<T>
> {
	constructor(public operacion: U) {}

	async getAll(
		where: object = {},
		relations: string[] = [],
		order: object = {}
	): Promise<T[]> {
		const resultados = await this.operacion.getAll(where, relations, order);
		return resultados;
	}

	async getById(id: number): Promise<T> {
		const relations: string[] = [];

		const resultado = await this.operacion.getById(id, relations);
		return resultado;
	}

	async getByPage(
		page: number,
		pageSize: number,
		where: object = {},
		relations: string[] = [],
		order: object = {}
	): Promise<[records: T[], totalRecords: number]> {
		const resultados = await this.operacion.getByPage(
			page,
			pageSize,
			where,
			relations,
			order
		);
		return resultados;
	}

	async insert(record: Partial<T>): Promise<T> {
		const resultado = await this.operacion.insert(record);
		return resultado;
	}

	async update(
		record: Partial<T>,
		where: {},
		relations: string[] = []
	): Promise<T> {
		const resultado = await this.operacion.update(record, where, relations);
		return resultado;
	}

	async delete(id: number): Promise<T> {
		const resultado = await this.operacion.delete(id);
		return resultado;
	}
}
