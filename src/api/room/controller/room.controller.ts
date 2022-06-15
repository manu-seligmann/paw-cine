import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from '../service/room.service';

@Controller('api/room')
export class RoomController {
    constructor(private roomService: RoomService) {}

    @Get()
    async getAllRoomTypes() {
        return this.roomService.getAllRoomTypes();
    }

    @Get(':roomTypeId')
    async getRoomType(@Param() params) {
        return this.roomService.getRoomType(params.roomTypeId);
    }
}
