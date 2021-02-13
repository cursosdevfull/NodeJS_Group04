import { getRepository, ObjectType, Repository } from 'typeorm';
import * as _ from 'lodash';

export default class GenericoDatabaseRepository<T> {
	private entity: ObjectType<T>;

	constructor(entity: ObjectType<T>) {
		this.entity = entity;
	}

	async getAll(
		where: object = {},
		relations: string[] = [],
		order: object = {}
	): Promise<T[]> {
		const repository: Repository<T> = getRepository<T>(this.entity);
		const records: T[] = await repository.find({
			where,
			relations,
			order,
		});

		return records;
	}

	async getOne(where: object = {}, relations: string[] = []): Promise<T> {
		const repository: Repository<T> = getRepository<T>(this.entity);
		const record: T = await repository.findOne({
			where,
			relations,
		});

		return record;
	}

	async getById(id: number, relations: string[] = []): Promise<T> {
		const repository: Repository<T> = getRepository<T>(this.entity);
		const record: T = await repository.findOne(id, { relations });
		return record;
	}

	async getByPage(
		page: number,
		pageSize: number,
		where: object = {},
		relations: string[] = [],
		order: object = {}
	): Promise<[records: T[], totalRecords: number]> {
		const repository: Repository<T> = getRepository<T>(this.entity);
		const [records, totalRecords] = await repository.findAndCount({
			where,
			order,
			relations,
			skip: page * pageSize,
			take: pageSize,
		});

		return [records, totalRecords];
	}

	async insert(record: T): Promise<T> {
		const repository: Repository<T> = getRepository<T>(this.entity);
		const result: T = await repository.save(record);
		return result;
	}

	async update(record: T, where: object = {}, relations: string[] = []) {
		const repository: Repository<T> = getRepository<T>(this.entity);
		let recordToUpdate = await repository.findOne({ where, relations });

		recordToUpdate = _.merge(recordToUpdate, record);

		/* 		for (const prop in record) {
			if (recordToUpdate[prop]) {
				recordToUpdate[prop] = record[prop];
			}
		} */

		await repository.save(recordToUpdate);

		return recordToUpdate;
	}

	async delete(id: number): Promise<T> {
		const repository: Repository<T> = getRepository<T>(this.entity);
		const recordToDelete = await repository.findOne(id);

		if (recordToDelete) {
			await repository.delete(id);
			return recordToDelete;
		}

		return null;
	}
}
