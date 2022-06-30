import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export const FULL_RESERVATION_SCHEMA = {
    id: true,
    clientName: true,
    clientEmail: true,
    clientPhone: true,
    createdAt: true,
    Show: {
        select: {
            id: true,
            dateTime: true,
            Movie: {
                include: {
                    Movie: true,
                },
            },
            Room: {
                select: {
                    id: true,
                    number: true,
                    isVisible: true,
                    RoomType: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            isVisible: true,
                        },
                    },
                },
            },
        },
    },
    Seats: {
        select: {
            seatId: true,
        },
    },
};

export const FULL_PRE_RESERVATION_SCHEMA = {
    ...FULL_RESERVATION_SCHEMA,
    expiresAt: true,
};

@Injectable()
export class ReservationRepository {
    constructor(private prismaService: PrismaService) {}

    public async getPreReservation(id: number) {
        const preReservation =
            await this.prismaService.preReservation.findFirst({
                where: {
                    id,
                },
                select: {
                    ...FULL_PRE_RESERVATION_SCHEMA,
                },
            });

        return preReservation;
    }

    public async createPreReservation(
        showId: number,
        seatsId: number[],
        clientName: string,
        clientEmail: string,
        clientPhone,
    ) {
        const show = await this.prismaService.show.findUnique({
            where: {
                id: showId,
            },
            include: {
                Room: true,
                Movie: true,
                Reservations: {
                    include: {
                        Seats: true,
                    },
                },
                PreReservations: {
                    include: {
                        Seats: true,
                    },
                },
            },
        });
        if (!show) throw new BadRequestException('Show not found!');

        // Check if all the given seats id exists
        const existingSeats = await this.prismaService.roomSeats.findMany({
            where: {
                roomId: show.roomId,
                id: {
                    in: seatsId,
                },
            },
        });
        if (existingSeats.length !== seatsId.length)
            throw new BadRequestException('Some Seats ID are not valid!');

        // Check if the Seats are not already reserved
        for (const reservation of show.Reservations) {
            for (const seat of reservation.Seats) {
                if (seatsId.includes(seat.seatId))
                    throw new BadRequestException(
                        `Seat already reserved. Seat ID: ${seat.seatId}`,
                    );
            }
        }
        // Check if the Seats are not already pre-reserved
        for (const preReservation of show.PreReservations) {
            for (const seat of preReservation.Seats) {
                if (seatsId.includes(seat.seatId))
                    throw new BadRequestException(
                        `Seat already pre-reserved. Seat ID: ${seat.seatId}`,
                    );
            }
        }

        const preReservation = await this.prismaService.preReservation.create({
            data: {
                showId,
                clientName,
                clientEmail,
                clientPhone,
                Seats: {
                    create: seatsId.map((seatId) => ({
                        roomId: show.roomId,
                        seatId,
                    })),
                },
                createdAt: new Date(),
                expiresAt: new Date(Number(new Date()) + 3600 * 1000), // 1 Hour from now
            },
        });

        return preReservation;
    }

    public async deletePreReservation(preReservationId: number) {
        // Deletes the pre-reservation seats
        const deleteSeats = this.prismaService.preReservedSeats.deleteMany({
            where: {
                preReservationId,
            },
        });

        // Deletes the pre-reservations
        const deletePreReservations =
            this.prismaService.preReservation.deleteMany({
                where: {
                    id: preReservationId,
                },
            });

        // Executes the transaction
        await this.prismaService.$transaction([
            deleteSeats,
            deletePreReservations,
        ]);
    }

    public async deleteExpiredPreReservations() {
        // Gets the existing expired pre-reservations
        const expiredPreReservations =
            await this.prismaService.preReservation.findMany({
                where: {
                    expiresAt: {
                        lt: new Date(),
                    },
                },
            });

        const mercadoPagoPayments =
            this.prismaService.mercadoPagoPayment.deleteMany({
                where: {
                    preReservationId: {
                        in: expiredPreReservations.map(
                            (preReservation) => preReservation.id,
                        ),
                    },
                },
            });

        // Deletes the pre-reservation seats
        const deleteSeats = this.prismaService.preReservedSeats.deleteMany({
            where: {
                preReservationId: {
                    in: expiredPreReservations.map(
                        (preReservation) => preReservation.id,
                    ),
                },
            },
        });

        // Deletes the pre-reservations
        const deletePreReservations =
            this.prismaService.preReservation.deleteMany({
                where: {
                    id: {
                        in: expiredPreReservations.map(
                            (preReservation) => preReservation.id,
                        ),
                    },
                },
            });

        // Executes the transaction
        await this.prismaService.$transaction([
            mercadoPagoPayments,
            deleteSeats,
            deletePreReservations,
        ]);
    }

    public async getReservation(reservationId: number) {
        const reservation = await this.prismaService.reservation.findUnique({
            where: {
                id: reservationId,
            },
            select: {
                ...FULL_RESERVATION_SCHEMA,
            },
        });

        return reservation;
    }

    public async createReservationFromPreReservation(
        id: number,
        paidAt?: string,
    ) {
        // Fetches the existing pre-reservation
        const preReservation = await this.getPreReservation(id);
        if (!preReservation)
            throw new BadRequestException('Pre Reservation not found!');

        // Creates the reservation
        const reservationCreated = await this.createReservation(
            preReservation.Show.id,
            preReservation.Seats.map((seat) => seat.seatId),
            preReservation.clientName,
            preReservation.clientEmail,
            preReservation.clientPhone,
            paidAt,
        );

        return reservationCreated;
    }

    

    public async createReservation(
        showId: number,
        seatsId: number[],
        clientName: string,
        clientEmail: string,
        clientPhone: string,
        paidAt?: string,
    ) {
        const show = await this.prismaService.show.findUnique({
            where: {
                id: showId,
            },
        });
        if (!show) throw new BadRequestException('Show not found!');

        const reservationCreated = await this.prismaService.reservation.create({
            data: {
                showId,
                clientName,
                clientEmail,
                clientPhone,
                paidAt,
                Seats: {
                    createMany: {
                        data: seatsId.map((seatId) => ({
                            seatId,
                            roomId: show.roomId,
                        })),
                    },
                },
            },
        });

        return reservationCreated;
    }
}
