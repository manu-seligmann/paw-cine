import { Global, Module, forwardRef } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import { ReservationService } from './service/reservation.service';
import { ReservationController } from './controller/reservation.controller';
import { ReservationRepository } from './respository/reservation.repository';

import { MercadoPagoModule } from '../mercado-pago/mercado-pago.module';

@Global()
@Module({
    providers: [PrismaService, ReservationService, ReservationRepository],
    controllers: [ReservationController],
    imports: [forwardRef(() => MercadoPagoModule)],
    exports: [ReservationService],
})
export class ReservationModule {}
