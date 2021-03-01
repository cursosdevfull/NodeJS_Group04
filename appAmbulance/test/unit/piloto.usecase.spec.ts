import { PilotoUseCase } from '../../src/pilotos/aplicacion/piloto.usecase';
import { PilotoModel } from '../../src/pilotos/dominio/piloto.model';
import { PilotoOperation } from '../../src/pilotos/infraestructura/piloto.operation';

const listDrivers: PilotoModel[] = [
	{ id: 1, nombre: 'piloto1' },
	{ id: 2, nombre: 'piloto2' },
];

jest.mock('../../src/pilotos/infraestructura/piloto.operation');

describe('piloto.usecase.ts', () => {
	it('getAll', async () => {
		const operation = jest.fn().mockReturnValue({
			getAll: jest.fn().mockResolvedValue(listDrivers),
			getOne: jest.fn().mockResolvedValue(''),
			getById: jest.fn().mockResolvedValue(''),
			getByPage: jest.fn().mockResolvedValue(''),
			insert: jest.fn().mockResolvedValue(''),
			update: jest.fn().mockResolvedValue(''),
			delete: jest.fn().mockResolvedValue(''),
			getSearch: jest.fn().mockResolvedValue(''),
		});

		const pilotoUseCase = new PilotoUseCase(operation);
	});
});
