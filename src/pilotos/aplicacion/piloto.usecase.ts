import GenericoUseCaseRepository from '../../compartido/aplicacion/generico-usecase.repository';
import { PilotoModel } from '../dominio/piloto.model';
import { PilotoRepository } from '../dominio/piloto.repository';

export class PilotoUseCase extends GenericoUseCaseRepository<
	PilotoModel,
	PilotoRepository
> {
	constructor(public operacion: PilotoRepository) {
		super(operacion);
	}

	async getSearch(): Promise<PilotoModel[]> {
		const resultados = await this.operacion.getSearch();
		return resultados;
	}
}
