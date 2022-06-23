/* eslint-disable @typescript-eslint/ban-ts-comment */
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ReservationService } from '../../reservation/service/reservation.service';
import { MercadoPagoRepository } from '../repository/mercado-pago.repository';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class MercadoPagoService {
    constructor(
        private mercadoPagoRepository: MercadoPagoRepository,
        @Inject(forwardRef(() => ReservationService))
        private reservationService: ReservationService,
    ) {}

    async createPaymentForPreReservation(preReservationId: number) {
        // Fetches the Pre-Reservation
        const preReservation = await this.reservationService.getPreReservation(
            preReservationId,
        );

        const paymentUuid = uuidV4();
        const roomTypeName = preReservation.Show.Room.RoomType.name;
        const movieName = preReservation.Show.Movie.Movie.name;
        const movieLanguage = preReservation.Show.Movie.language;
        const price = preReservation.Show.Room.RoomType.price;
        const seatsAmount = preReservation.Seats.length;
        const total = price * seatsAmount;

        const mercadoPagoPreference =
            await this.mercadoPagoRepository.createPreference(
                paymentUuid,
                preReservation.clientEmail,
                `Cine PAW - ${movieName} - ${movieLanguage} - ${roomTypeName} - Entradas x${seatsAmount}`,
                total,
                preReservation.expiresAt.toString(),
            );

        const databasePayment =
            await this.mercadoPagoRepository.persistPreferenceInDB(
                paymentUuid,
                total,
                mercadoPagoPreference.id,
                preReservation.id,
            );

        return {
            preference: mercadoPagoPreference,
            database: databasePayment,
        };
    }

    public async mercadoPagoPaymentConfirmation(query: any, body: any) {
        if (query['type'] !== 'payment') return;

        // Fetches the Payment full data
        const paymentId = body.data.id;
        const payment = await this.mercadoPagoRepository.getPayment(paymentId);
        console.log(payment);
        const paymentUuid = payment.metadata.payment_uuid;

        // Fetches the Persisted Preference data
        const persistedPreference =
            await this.mercadoPagoRepository.getPersistedPreference(
                paymentUuid,
            );
        if (!persistedPreference) return;

        // Creates the reservation out of the pre-reservation data
        const reservationCreated =
            await this.reservationService.createReservationFromPreReservation(
                persistedPreference.preReservationId,
            );

        // Updates the persisted paid preference pointing to the created reservation
        await this.mercadoPagoRepository.updatePersistedPreference(
            persistedPreference.id,
            {
                preReservationId: null,
                reservationId: reservationCreated.id,
            },
        );

        // Deletes the pre-reservation
        await this.reservationService.deletePreReservation(
            persistedPreference.preReservationId,
        );
    }
}
