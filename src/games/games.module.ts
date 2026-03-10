import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Game } from './entities/game.entity';
import { Session } from './entities/session.entity';
import { Comment } from './entities/comment.entity';
import { Participant } from './entities/participant.entity';

import { GameService } from './game/game.service';
import { GameController } from './game/game.controller';

import { SessionService } from './session/session.service';
import { SessionController } from './session/session.controller';

import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';

import { ParticipantService } from './participant/participant.service';
import { ParticipantController } from './participant/participant.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Game, Session, Comment, Participant])],
    controllers: [GameController, SessionController, CommentController, ParticipantController],
    providers: [GameService, SessionService, CommentService, ParticipantService],
})
export class GamesModule {}
