import GenericoUseCaseRepository from '../../compartido/aplicacion/generico-usecase.repository';
import { UsuarioModel } from '../dominio/usuario.model';
import { UsuarioRepository } from '../dominio/usuario.repository';
import { CryptService } from '../../compartido/aplicacion/crypt.service';

export class UsuarioUseCase extends GenericoUseCaseRepository<
	UsuarioModel,
	UsuarioRepository
> {
	constructor(public operacion: UsuarioRepository) {
		super(operacion);
	}

	async insert(record: Partial<UsuarioModel>): Promise<UsuarioModel> {
		record.password = await CryptService.encrypt(record.password);
		const resultado = await this.operacion.insert(record);
		return resultado;
	}

	async getSearch(): Promise<UsuarioModel[]> {
		const resultados = await this.operacion.getSearch();
		return resultados;
	}
}
