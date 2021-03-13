import { PilotoUseCase } from '../../src/pilotos/aplicacion/piloto.usecase';
import { PilotoModel } from '../../src/pilotos/dominio/piloto.model';
import { PilotoOperation } from '../../src/pilotos/infraestructura/piloto.operation';
import mockPilotos from '../mocks/pilotos.json';

describe('piloto.usecase.ts', () => {
	it('getAll', async () => {
		(PilotoOperation as jest.Mock) = jest.fn().mockReturnValue({
			getAll: jest.fn().mockResolvedValue(mockPilotos),
		});

		const operation = new PilotoOperation();
		const pilotoUseCase = new PilotoUseCase(operation);
		const results = await pilotoUseCase.getAll();

		expect(results).toEqual(mockPilotos);
	});
});
