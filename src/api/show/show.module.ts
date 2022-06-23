import { Module } from '@nestjs/common';
import { ShowService } from './service/show.service';
import { ShowController } from './controller/show.controller';

@Module({
    providers: [ShowService],
    controllers: [ShowController],
})
export class ShowModule {}
