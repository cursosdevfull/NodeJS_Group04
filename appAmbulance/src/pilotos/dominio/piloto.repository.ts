import { GenericoRepository } from '../../compartido/dominio/generico.repository';
import { PilotoModel } from './piloto.model';

export interface PilotoRepository extends GenericoRepository<PilotoModel> {
	getSearch(): Promise<PilotoModel[]>;
}
