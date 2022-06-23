import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
} from '@nestjs/common';
import { MercadoPagoService } from 'src/api/mercado-pago/service/mercado-pago.service';
import { CreatePreReservationDto } from '../dto/createPreReservation.dto';
import { ReservationRepository } from '../respository/reservation.repository';

@Injectable()
export class ReservationService {
    constructor(
        private reservationRepository: ReservationRepository,
        @Inject(forwardRef(() => MercadoPagoService))
        private mercadoPagoService: MercadoPagoService,
    ) {}

    async getPreReservation(id: number) {
        if (isNaN(id)) throw new BadRequestException('id is not valid!');
        return this.reservationRepository.getPreReservation(id);
    }

    async createPreReservation(params: CreatePreReservationDto) {
        // Deletes the expired pre-reservations
        await this.reservationRepository.deleteExpiredPreReservations();

        // Creates the pre-reservation
        const preReservationCreated =
            await this.reservationRepository.createPreReservation(
                params.showId,
                params.seatsId,
                params.clientName,
                params.clientEmail,
                params.clientPhone,
            );

        // Retrieves the created pre-reservation full information
        const preReservation =
            await this.reservationRepository.getPreReservation(
                preReservationCreated.id,
            );

        const mercadoPagoPreference =
            await this.mercadoPagoService.createPaymentForPreReservation(
                preReservation.id,
            );

        return {
            preReservation,
            mercadoPagoPreference,
        };
    }

    async createReservationFromPreReservation(id: number, paidAt?: string) {
        // Deletes the expired pre-reservations
        await this.reservationRepository.deleteExpiredPreReservations();

        const reservationCreated =
            await this.reservationRepository.createReservationFromPreReservation(
                id,
                paidAt,
            );

        return this.reservationRepository.getReservation(reservationCreated.id);
    }

    public async deletePreReservation(preReservationId: number) {
        await this.reservationRepository.deletePreReservation(preReservationId);
    }
}
