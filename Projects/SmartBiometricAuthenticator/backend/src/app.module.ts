import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsController } from './interfaces/http/contacts/contacts.controller';
import { ContactOrmEntity } from './infrastructure/persistence/typeorm/contact.orm-entity';
import { ContactRepositoryAdapter } from './infrastructure/persistence/typeorm/contact.repository.adapter';
import { CreateContactUseCase } from './application/contacts/use-cases/create-contact.usecase';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'smart_biometric_auth',
      entities: [ContactOrmEntity],
      synchronize: true, // SOLO PARA DESARROLLO
    }),
    TypeOrmModule.forFeature([ContactOrmEntity]),
  ],
  controllers: [AppController, ContactsController],
  providers: [
    AppService,
    CreateContactUseCase,
    {
      provide: 'ContactRepositoryPort',
      useClass: ContactRepositoryAdapter,
    },
  ],
})
export class AppModule {}
