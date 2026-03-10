import { Controller, Get, Param } from '@nestjs/common';

import { GameService } from './game.service';

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    findAll() {
        return this.gameService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.gameService.findOne(id);
    }
}
