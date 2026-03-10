import { Controller, Get, Param } from '@nestjs/common';

import { ParticipantService } from './participant.service';

@Controller('participants')
export class ParticipantController {
    constructor(private readonly participantService: ParticipantService) {}

    @Get()
    findAll() {
        return this.participantService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.participantService.findOne(id);
    }
}
