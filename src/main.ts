import { NestFactory } from '@nestjs/core';
import { AppModule } from './adaptInterface/controllers/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Altoriza toda fonte
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   methods: 'HEAD,GET,POST,PUT,PATCH',
  //   allowedHeaders: 'Content-Type, Authorization, Accept',
  //   credentials: true,
  // });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
