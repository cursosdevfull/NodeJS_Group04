export interface GenericoRepository<T> {
	getAll(where: object, relations: string[], order: object): Promise<T[]>;
	getOne(where: object, relations: string[]): Promise<T>;
	getById(id: number, relations: string[]): Promise<T>;
	getByPage(
		page: number,
		pageSize: number,
		where: object,
		relations: string[],
		order: object
	): Promise<[records: T[], totalRecords: number]>;
	insert(entity: Partial<T>): Promise<T>;
	update(entity: Partial<T>, where: object, relations: string[]): Promise<T>;
	delete(id: number): Promise<T>;
}

/* export abstract class GenericoRepository<T> {
	abstract getAll(): T[];
	abstract getOne(id: number): T;
	abstract getByPage(pagina: number): T[];
	abstract insert(entidad: T): T;
	abstract update(id: number, entidad: T): T;
	abstract delete(id: number): T;
}
 */
