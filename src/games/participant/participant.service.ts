import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Participant } from '../entities/participant.entity';

import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,
    ) {}

    findAll() {
        return this.participantRepository.find();
    }

    findOne(id: number) {
        return this.participantRepository.findOneBy({ id });
    }

    async create(createParticipantDto: CreateParticipantDto) {
        const newParticipant = this.participantRepository.create({
            ...createParticipantDto,
            session: { id: createParticipantDto.sessionId },
            user: { id: createParticipantDto.userId },
        });
        return this.participantRepository.save(newParticipant);
    }

    async update(id: number, updateParticipantDto: UpdateParticipantDto) {
        await this.participantRepository.update(id, updateParticipantDto);
        return this.participantRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const result = await this.participantRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }
}
