import { Controller } from '@nestjs/common';

@Controller()
// Todas las rutas deberan tener el prefijo /admin
export class AdminController {
    // Here will go all the private/admin-only endpoints
}
