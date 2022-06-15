import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoomService {
    constructor(private prisma: PrismaService) {}

    async getAllRoomTypes() {
        return this.prisma.roomType.findMany();
    }

    async getRoomType(id: number) {
        return this.prisma.roomType.findUnique({
            where: { id: Number(id) },
            include: {
                Rooms: true,
            },
        });
    }

    async getAll(): Promise<Room[]> {
        return this.prisma.room.findMany();
    }

    async getRoom(id: number): Promise<Room> {
        return this.prisma.room.findUnique({
            where: { id },
            include: {},
        });
    }
}
