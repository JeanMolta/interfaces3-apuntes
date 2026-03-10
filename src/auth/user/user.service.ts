import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { RoleService } from '../role/role.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RoleService,
    ) {}

    findAll(username: string | undefined, email: string | undefined) {
        return this.userRepository.find();
    }

    findOne(_id: number) {
        throw new Error('Method not implemented.');
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.userRepository.update(id, updateUserDto);
        return this.userRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const result = await this.userRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }

    async create(createUseDto: CreateUserDto) {
        // Buscamos el role segun el nombre
        const role = await this.roleService.findByName(createUseDto.roleName);
        if (!role) {
            throw new Error('Role not found');
        }

        // Transfomar del DTO al User
        const newUser = this.userRepository.create({
            ...createUseDto,
            role,
        });

        return this.userRepository.save(newUser);
    }
}
