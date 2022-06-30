import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class PublicController {
    // Here will go all the public endpoints

    @Get()
    @Render('pages/public/home')
    getHomeView() {
        // Return the home view
        return {};
    }

    @Get('/cartelera')
    @Render('pages/public/movies')
    getMoviesView() {
        // Return the movies view
    }

    @Get('/cartelera/:movieId')
    @Render('pages/public/movie')
    getMovieView() {
        // Return the specific movie view
    }

    @Get('/salas')
    @Render('pages/public/rooms')
    getRoomTypesView() {
        // Return the movies view
    }

    @Get('/nosotros')
    @Render('pages/public/about')
    getAboutView() {
        // Return the about view
    }

    @Get('/reservacion')
    @Render('pages/public/reservation')
    getReservationView() {
        // Return the reservation view
        return {
            documentName: 'Reserva',
            movies: [
                {
                    id: 1,
                    name: 'movie 1',
                    imageUrl: 'https://picsum.photos/200/300',
                },
                {
                    id: 2,
                    name: 'movie 2',
                    imageUrl: 'https://picsum.photos/200/300',
                },
                {
                    id: 3,
                    name: 'movie 3',
                    imageUrl: 'https://picsum.photos/200/300',
                },
                {
                    id: 4,
                    name: 'movie 4',
                    imageUrl: 'https://picsum.photos/200/300',
                },
            ],
        };
    }
}
