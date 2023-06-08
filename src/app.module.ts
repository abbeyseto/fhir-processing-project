import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BundleModule } from './bundle/bundle.module';
import { BundleController } from './bundle/bundle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bundle2Module } from './bundle2/bundle2.module';
import { Bundle2Controller } from './bundle2/bundle2.controller';
import { CronService } from './cron.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientQueueModule } from './patient-queue/patient-queue.module';
import { PatientQueue } from './patient-queue/patient-queue.entity';
import {PatientQueueController} from './patient-queue/patient-queue.controller';


@Module({
  imports: [
    BundleModule,
    PatientQueueModule,
    Bundle2Module,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [PatientQueue],
      synchronize: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017')],
  controllers: [AppController, BundleController, Bundle2Controller, PatientQueueController],
  providers: [AppService, CronService],
})
export class AppModule { }

