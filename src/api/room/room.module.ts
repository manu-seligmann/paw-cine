import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RoomService } from './service/room.service';
import { RoomController } from './controller/room.controller';

@Module({
    providers: [PrismaService, RoomService],
    controllers: [RoomController],
})
export class RoomModule {}
