import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsController } from './interfaces/http/contacts/contacts.controller';
import { CamerasController } from './interfaces/http/cameras/cameras.controller';
import { EventsController } from './interfaces/http/events/events.controller';
import { ContactOrmEntity } from './infrastructure/persistence/typeorm/contact.orm-entity';
import { CameraOrmEntity } from './infrastructure/persistence/typeorm/camera.orm-entity';
import { EventOrmEntity } from './infrastructure/persistence/typeorm/event.orm-entity';
import { ContactRepositoryAdapter } from './infrastructure/persistence/typeorm/contact.repository.adapter';
import { CameraRepositoryAdapter } from './infrastructure/persistence/typeorm/camera.repository.adapter';
import { EventRepositoryAdapter } from './infrastructure/persistence/typeorm/event.repository.adapter';
import { CreateContactUseCase } from './application/contacts/use-cases/create-contact.usecase';
import { RegisterCameraUseCase } from './application/cameras/use-cases/register-camera.usecase';
import { ListLatestEventsUseCase } from './application/events/use-cases/list-latest-events.usecase';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'smart_biometric_auth',
      entities: [ContactOrmEntity, CameraOrmEntity, EventOrmEntity],
      synchronize: true, // SOLO PARA DESARROLLO
    }),
    TypeOrmModule.forFeature([ContactOrmEntity, CameraOrmEntity, EventOrmEntity]),
  ],
  controllers: [AppController, ContactsController, CamerasController, EventsController],
  providers: [
    AppService,
    CreateContactUseCase,
    RegisterCameraUseCase,
    ListLatestEventsUseCase,
    {
      provide: 'ContactRepositoryPort',
      useClass: ContactRepositoryAdapter,
    },
    {
      provide: 'CameraRepositoryPort',
      useClass: CameraRepositoryAdapter,
    },
    {
      provide: 'EventRepositoryPort',
      useClass: EventRepositoryAdapter,
    },
  ],
})
export class AppModule {}
