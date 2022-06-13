import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './web/admin/Admin.controller';
import { PublicController } from './web/public/Public.controller';

@Module({
    imports: [],
    controllers: [PublicController, AdminController],
    providers: [AppService],
})
export class AppModule {}
