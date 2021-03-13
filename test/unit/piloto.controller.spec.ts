import mockPilotos from '../mocks/pilotos.json';
import * as httpMock from 'node-mocks-http';
import { PilotoUseCase } from '../../src/pilotos/aplicacion/piloto.usecase';
import { PilotoOperation } from '../../src/pilotos/infraestructura/piloto.operation';

let req: httpMock.MockRequest<any>;
let res: httpMock.MockResponse<any>;

beforeEach(() => {
	req = httpMock.createRequest();
	res = httpMock.createResponse();
});

describe('piloto.controller.ts', () => {
	it('getAll', async () => {
		(PilotoUseCase as jest.Mock) = jest.fn().mockReturnValue({
			getAll: jest.fn().mockResolvedValue(mockPilotos),
		});

		const operation = new PilotoOperation();
		const controller = new PilotoUseCase(operation);

		controller.getAll(req, res);

		const mockGetAll = controller.getAll as jest.Mock;
		const results = await mockGetAll.mock.results[0].value;

		expect(mockGetAll.mock.calls.length).toBe(1);
		expect(results).toEqual(mockPilotos);
	});
});
