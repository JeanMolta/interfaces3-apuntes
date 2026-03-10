import { SessionStatus } from '../../entities/session.entity';

export class CreateSessionDto {
    status: SessionStatus;
    notes: string;
    gameId: number;
    hostId: number;
}
