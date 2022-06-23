/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as mercadopago from 'mercadopago';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MercadoPagoRepository {
    constructor(private prismaService: PrismaService) {}

    public async getPayment(id: number) {
        mercadopago.configure({
            access_token: process.env.MP_PRIVATE_KEY,
        });

        const payment = await mercadopago.payment.findById(id);
        return payment.body;
    }

    public async createPreference(
        paymentUuid: string,
        userEmail: string,
        title: string,
        total: number,
        expirationDate: string,
    ) {
        mercadopago.configure({
            access_token: process.env.MP_PRIVATE_KEY,
        });

        const createdPreference = await mercadopago.preferences.create({
            payer: {
                email: userEmail,
            },
            items: [
                {
                    title,
                    quantity: 1,
                    unit_price: total,
                },
            ],
            expires: true,
            date_of_expiration: new Date(expirationDate)
                .toISOString() // 2022-06-22T11:28:05.000Z
                .replace('Z', '+00:00'), // 2022-06-22T11:28:05.000+00:00
            // @ts-ignore
            metadata: {
                paymentUuid,
            },
            notification_url: process.env.MP_WEBHOOK_URL,
        });

        return createdPreference.body;
    }

    async persistPreferenceInDB(
        paymentUuid: string,
        total: number,
        preferenceId: string,
        preReservationId: number,
    ) {
        return this.prismaService.mercadoPagoPayment.create({
            data: {
                uuid: paymentUuid,
                total,
                preferenceId,
                preReservationId,
            },
        });
    }

    async getPersistedPreference(uuid: string) {
        const preference =
            await this.prismaService.mercadoPagoPayment.findUnique({
                where: {
                    uuid,
                },
            });
        return preference;
    }

    updatePersistedPreference(id: number, params: any) {
        return this.prismaService.mercadoPagoPayment.update({
            where: {
                id,
            },
            data: {
                ...params,
            },
        });
    }
}
