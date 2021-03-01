import { PilotoUseCase } from '../aplicacion/piloto.usecase';
import { Request, Response } from 'express';
import { PilotoModel } from '../dominio/piloto.model';
import { Responses } from '../../compartido/infraestructura/responses';

export class PilotoController {
	constructor(private readonly usecase: PilotoUseCase) {
		this.getAll = this.getAll.bind(this);
		this.getById = this.getById.bind(this);
		this.getByPage = this.getByPage.bind(this);
		this.insert = this.insert.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
		this.getSearch = this.getSearch.bind(this);
	}

	async getAll(req: Request, res: Response) {
		const where: object = {};
		const relations: string[] = [];
		const order: object = {};

		const resultados = await this.usecase.getAll(where, relations, order);
		Responses.sentOk(res, resultados);
	}

	async getSearch(req: Request, res: Response) {
		const resultados = await this.usecase.getSearch();
		Responses.sentOk(res, resultados);
	}

	async getById(req: Request, res: Response) {
		const id = +req.params.id;

		const resultado = await this.usecase.getById(id);
		Responses.sentOk(res, resultado);
	}

	async getByPage(req: Request, res: Response) {
		const page = +req.params.page;
		const pageSize = +req.params.pageSize;
		const where: object = {};
		const relations: string[] = [];
		const order: object = {};

		const [records, totalRecords] = await this.usecase.getByPage(
			page,
			pageSize,
			where,
			relations,
			order
		);

		Responses.sentOk(res, { records, totalRecords });
	}

	async insert(req: Request, res: Response) {
		const Piloto: Partial<PilotoModel> = {
			nombre: req.body.nombre,
		};

		const resultado = await this.usecase.insert(Piloto);
		Responses.sentOk(res, resultado, 201);
	}

	async update(req: Request, res: Response) {
		const Piloto: Partial<PilotoModel> = req.body;
		const where: object = {};
		const relations: string[] = [];

		const resultado = await this.usecase.update(Piloto, where, relations);
		Responses.sentOk(res, resultado);
	}

	async delete(req: Request, res: Response) {
		const id = +req.params.id;

		const resultado = await this.usecase.delete(id);

		Responses.sentOk(res, resultado);
	}
}
