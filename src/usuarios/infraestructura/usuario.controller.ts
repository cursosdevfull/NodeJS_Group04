import { UsuarioUseCase } from '../aplicacion/usuario.usecase';
import { Request, Response } from 'express';
import { UsuarioModel } from '../dominio/usuario.model';
import { Tokens } from '../../compartido/infraestructura/token';
import { userInfo } from 'os';
import { Responses } from '../../compartido/infraestructura/responses';

export class UsuarioController {
	constructor(private readonly usecase: UsuarioUseCase) {
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
		const relations: string[] = ['roles'];
		const order: object = {};

		const resultados = await this.usecase.getAll(where, relations, order);
		Responses.sentOk(res, resultados);
	}

	async getSearch(req: Request, res: Response) {
		const resultados = await this.usecase.getSearch();
		res.json(resultados);
	}

	async getById(req: Request, res: Response) {
		const id = +req.params.id;

		const resultado = await this.usecase.getById(id);
		res.json(resultado);
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

		res.json({ records, totalRecords });
	}

	async insert(req: Request, res: Response) {
		const usuario: Partial<UsuarioModel> = {
			nombre: req.body.name,
			correo: req.body.email,
			password: req.body.password,
			refreshToken: Tokens.generateRefreshToken(),
			foto: req.body.foto,
		};

		const roles: any[] = req.body.roles;
		const rolesUpdate = roles.map(rolId => ({ id: rolId }));
		usuario.roles = rolesUpdate;

		const resultado = await this.usecase.insert(usuario);
		res.json(resultado);
	}

	async update(req: Request, res: Response) {
		const usuario: Partial<UsuarioModel> = {};
		if (req.body.name) {
			usuario.nombre = req.body.name;
		}
		if (req.body.email) {
			usuario.correo = req.body.email;
		}
		if (req.body.roles) {
			usuario.roles = req.body.roles;
		}
		if (req.body.password) {
			usuario.password = req.body.password;
		}

		const where: object = { id: +req.params.id };
		const relations: string[] = [];

		const resultado = await this.usecase.update(usuario, where, relations);
		res.json(resultado);
	}

	async delete(req: Request, res: Response) {
		const id = +req.params.id;

		const resultado = await this.usecase.delete(id);

		res.json(resultado);
	}
}
