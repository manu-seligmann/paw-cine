import { Module } from '@nestjs/common';
import { WebModule } from './web/web.module';
import { PrismaService } from './prisma.service';
import { RoomModule } from './api/room/room.module';
import { MovieModule } from './api/movie/movie.module';
import { ShowModule } from './api/show/show.module';
import { ReservationModule } from './api/reservation/reservation.module';
import { MercadoPagoModule } from './api/mercado-pago/mercado-pago.module';

@Module({
    imports: [
        PrismaService,
        WebModule,
        RoomModule,
        MovieModule,
        ShowModule,
        ReservationModule,
        MercadoPagoModule,
    ],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
