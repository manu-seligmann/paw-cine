import { Controller, Get, Redirect, Render } from '@nestjs/common';

@Controller('admin')
export class AdminController {
    @Get()
    @Redirect('/admin/cartelera')
    getHomeView() {
        // Return the home view
    }

    @Get('cartelera')
    @Render('pages/admin/moviesCRUD')
    getMoviesCRUDView() {
        // Return the Movies CRUD view
    }

    @Get('cartelera/:movieId')
    @Render('pages/admin/movie')
    getMovieView() {
        // Return the Movie view
    }

    @Get('salas')
    @Render('pages/admin/roomsCRUD')
    getRoomsCRUDView() {
        // Return the Rooms CRUD view
    }

    @Get('salas/:roomId')
    @Render('pages/admin/room')
    getRoomView() {
        // Return the Room view
    }

    @Get('funciones')
    @Render('pages/admin/showsCRUD')
    getShowsCRUDView() {
        // Return the Shows CRUD view
    }

    @Get('funciones/:showId')
    @Render('pages/admin/show')
    getShowView() {
        // Return the Shows view
    }
}
