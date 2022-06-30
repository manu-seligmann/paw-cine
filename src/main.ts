import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    app.useStaticAssets(resolve('./public'));
    app.setBaseViewsDir(resolve('./src/views'));
    hbs.registerPartials(resolve('./src/views/pages'));
    app.setViewEngine('hbs');

    await app.listen(3000);
    console.log(await app.getUrl());
}
bootstrap();
