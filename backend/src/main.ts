import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('notesApp')
    .setDescription('notesApp')
    .setVersion('1.0')
    .addTag('Notes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('notesApi', app, document);

  await app.enableCors(); // Enable CORS
  await app.listen(3000);
  Logger.log(`Server running on http://localhost:3000`, 'nestApi');
}
bootstrap();
