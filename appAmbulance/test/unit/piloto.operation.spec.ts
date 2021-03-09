import mockPilotos from '../mocks/pilotos.json';
import * as typeorm from 'typeorm';
import { PilotoOperation } from '../../src/pilotos/infraestructura/piloto.operation';

describe('piloto.operation.ts', () => {
	it('getAll', async () => {
		(typeorm.getRepository as jest.Mock) = jest.fn().mockReturnValue({
			find: jest.fn().mockResolvedValue(mockPilotos),
		});

		const operation = new PilotoOperation();
		const results = await operation.getAll();

		expect(results).toEqual(mockPilotos);
	});
});
