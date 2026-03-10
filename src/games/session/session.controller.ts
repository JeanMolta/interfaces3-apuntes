import { Controller, Get, Param } from '@nestjs/common';

import { SessionService } from './session.service';

@Controller('sessions')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @Get()
    findAll() {
        return this.sessionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.sessionService.findOne(id);
    }
}
