import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { RoleService } from '../role/role.service';
import { Role } from '../entities/role.entity';

describe('RoleService', () => {
    // TODO: Todas las pruebas de el servicio de los roles

    let roleService: RoleService;

    const mockRepository = {
        find: jest.fn(),
        findOneBy: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoleService, // Provider a validar a traves de pruebas
                { provide: getRepositoryToken(Role), useValue: mockRepository },
            ],
        }).compile();

        roleService = module.get<RoleService>(RoleService);
    });

    it('should be defined', () => {
        expect(roleService).toBeDefined();
    });
});
