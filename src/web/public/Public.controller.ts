import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class PublicController {
    // Here will go all the public endpoints

    @Get()
    @Render('pages/public/home')
    home() {
        // Return the home view
    }

    @Get('/cartelera')
    @Render('pages/public/movies')
    movies() {
        // Return the movies view
    }
}
