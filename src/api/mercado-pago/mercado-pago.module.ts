import { Global, Module, forwardRef } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';

import { MercadoPagoService } from './service/mercado-pago.service';
import { MercadoPagoController } from './controller/mercado-pago.controller';
import { MercadoPagoRepository } from './repository/mercado-pago.repository';

import { ReservationModule } from '../reservation/reservation.module';

@Global()
@Module({
    providers: [MercadoPagoService, MercadoPagoRepository, PrismaService],
    controllers: [MercadoPagoController],
    imports: [forwardRef(() => ReservationModule)],
    exports: [MercadoPagoService, MercadoPagoRepository],
})
export class MercadoPagoModule {}
