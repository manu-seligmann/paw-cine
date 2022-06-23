import { hash } from 'bcrypt';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const transactions = [];

    const hashPassword = await hash('admin', 10);
    const initialUser = prisma.user.create({
        data: {
            name: 'Admin',
            email: 'admin@local.com',
            password: hashPassword,
        },
    });
    transactions.push(initialUser);

    for (let i = 0; i < 5; i++) {
        const movie = prisma.movie.create({
            data: {
                name: `Pelicula ${i}`,
                description: `Esto es la description para la pelicula ${i}`,
                type: 'Algo',
                rate: 'Algo',
                duration: 120,
                synopsis: 'Algo',
                trailerUrl: 'www.url-al-trailer.com',
                Languages: {
                    createMany: {
                        data: [
                            {
                                language: 'Español',
                            },
                            {
                                language: 'Ingles subtitulado',
                            },
                        ],
                    },
                },
            },
        });
        transactions.push(movie);
    }

    const roomType = prisma.roomType.create({
        data: {
            name: 'Sala 2D',
            price: 100,
            Rooms: {
                create: [
                    {
                        number: 1,
                        Seats: {
                            create: [
                                {
                                    numberX: 1,
                                    numberY: 1,
                                },
                                {
                                    numberX: 1,
                                    numberY: 2,
                                },
                                {
                                    numberX: 1,
                                    numberY: 3,
                                },
                                {
                                    numberX: 1,
                                    numberY: 4,
                                },
                                {
                                    numberX: 1,
                                    numberY: 5,
                                },
                                {
                                    numberX: 1,
                                    numberY: 6,
                                },
                                {
                                    numberX: 1,
                                    numberY: 7,
                                },
                                {
                                    numberX: 1,
                                    numberY: 8,
                                },
                                {
                                    numberX: 1,
                                    numberY: 9,
                                },
                                {
                                    numberX: 1,
                                    numberY: 10,
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });

    transactions.push(roomType);

    const show = prisma.show.create({
        data: {
            roomId: 1,
            movieId: 1,
            language: 'Español',
            dateTime: new Date(),
        },
    });
    transactions.push(show);

    await prisma.$transaction(transactions);
}

main()
    .catch((error) => {
        console.error('Failed to execute seed!', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
