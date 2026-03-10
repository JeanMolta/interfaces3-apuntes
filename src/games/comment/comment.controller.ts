import { Controller, Get, Param } from '@nestjs/common';

import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    findAll() {
        return this.commentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.commentService.findOne(id);
    }
}
