import { Request, Response } from 'express';
import { MedicoUseCase } from '../aplicacion/medico.usecase';
import { MedicoEntity } from '../dominio/medico.entity';

export class MedicoController {
	constructor(private usecase: MedicoUseCase) {
		/* 		this.getAll = this.getAll.bind(this);
		this.insert = this.insert.bind(this);
		this.getOne = this.getOne.bind(this);
		this.getByPage = this.getByPage.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this); */
	}

	getAll() {
		const results = this.usecase.getAll();
		return results;
	}

	insert(req: Request, res: Response) {
		const entidad: MedicoEntity = req.body;
		const result = this.usecase.insert(entidad);
		res.json(result);
	}

	getOne(req: Request, res: Response) {
		const result = this.usecase.getOne(+req.params.id);
		res.json(result);
	}

	getByPage(req: Request, res: Response) {
		const results = this.usecase.getByPage(+req.params.page);
		res.json(results);
	}

	update(req: Request, res: Response) {
		const entidad = req.body;
		const result = this.usecase.update(+req.params.id, entidad);
		res.json(result);
	}

	delete(req: Request, res: Response) {
		const result = this.usecase.delete(+req.params.id);
		res.json(result);
	}
}
