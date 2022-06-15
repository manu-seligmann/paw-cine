import { Module } from '@nestjs/common';
import { AdminController } from './admin/Admin.controller';
import { PublicController } from './public/Public.controller';

@Module({
    controllers: [AdminController, PublicController],
})
export class WebModule {}
