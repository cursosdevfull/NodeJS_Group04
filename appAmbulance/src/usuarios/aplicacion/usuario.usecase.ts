import GenericoUseCaseRepository from '../../compartido/aplicacion/generico-usecase.repository';
import { UsuarioModel } from '../dominio/usuario.model';
import { UsuarioRepository } from '../dominio/usuario.repository';

export class UsuarioUseCase extends GenericoUseCaseRepository<
	UsuarioModel,
	UsuarioRepository
> {
	constructor(public operacion: UsuarioRepository) {
		super(operacion);
	}

	async getSearch(): Promise<UsuarioModel[]> {
		const resultados = await this.operacion.getSearch();
		return resultados;
	}
}
