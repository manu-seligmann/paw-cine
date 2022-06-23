import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MercadoPagoService } from 'src/api/mercado-pago/service/mercado-pago.service';
import { CreatePreReservationDto } from '../dto/createPreReservation.dto';
import { ReservationService } from '../service/reservation.service';

@Controller('api')
export class ReservationController {
    constructor(
        private reservationService: ReservationService,
        private mercadoPagoService: MercadoPagoService,
    ) {}

    @Post('pre-reservacion')
    async createPreReservation(@Body() params: CreatePreReservationDto) {
        return this.reservationService.createPreReservation(params);
    }

    @Get('pre-reservacion')
    async getPreReservation(@Query('id') id: number) {
        return this.reservationService.getPreReservation(id);
    }
}
