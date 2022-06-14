import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class PublicController {
    // Here will go all the public endpoints

    @Get()
    @Render('pages/public/home')
    getHomeView() {
        // Return the home view
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
}
