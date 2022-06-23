import { Body, Controller, Post, Query } from '@nestjs/common';
import { MercadoPagoService } from '../service/mercado-pago.service';

@Controller('api/mercado-pago')
export class MercadoPagoController {
    constructor(private mercadoPagoService: MercadoPagoService) {}

    @Post('webhook')
    mercadoPagoPaymentConfirmation(@Body() body: any, @Query() query: any) {
        this.mercadoPagoService.mercadoPagoPaymentConfirmation(query, body);
    }
}
