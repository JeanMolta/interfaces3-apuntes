import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { RoleService } from '../role/role.service';

import { UserService } from './user.service';

describe('UserService', () => {
    // TODO: Todas las pruebas de el servicio de los usuarios

    let userService: UserService;

    const mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        create: jest.fn(),
    };

    const mockRoleService = {
        findByName: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService, // Provider a validar a traves de pruebas
                { provide: getRepositoryToken(User), useValue: mockRepository },
                { provide: RoleService, useValue: mockRoleService },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    it('should return all users without filters', async () => {
        const mockUsers = [
            { id: 1, name: 'user1' },
            { id: 2, name: 'user2' },
        ];
        mockRepository.find.mockResolvedValue(mockUsers);
        const result = await userService.findAll();
        expect(result).toEqual(mockUsers);
        expect(mockRepository.find).toHaveBeenCalledWith({
            where: {},
        });

        it('should create user when has been added', async () => {
            const dto = {
                username: 'new-user',
                email: 'newuser@example.com',
                passwordHash: 'hashedPassword',
                bio: 'New user bio',
                roleName: 'ADMIN',
            };

            const role = { id: 1, name: 'ADMIN' };
            const entityToSave = { ...dto, role };
            const savedUser = { id: 1, ...entityToSave };

            mockRoleService.findByName.mockResolvedValue(role);
            mockRepository.create.mockReturnValue(entityToSave);
            mockRepository.save.mockReturnValue(savedUser);

            const result = await userService.create(dto);

            expect(mockRoleService.findByName).toHaveBeenCalledWith(dto.roleName);
            expect(mockRepository.create).toHaveBeenCalledWith({
                ...dto,
                role,
            });
            expect(mockRepository.save).toHaveBeenCalledWith(entityToSave);
            expect(result).toEqual(savedUser);
        });
    });
});
