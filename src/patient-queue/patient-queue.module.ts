import { Module } from '@nestjs/common';
import { PatientQueueController } from './patient-queue.controller';
import { PatientQueueService } from './patient-queue.service';
import { PatientQueue } from './patient-queue.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import exp from 'constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientQueue]),
  ],
  providers: [PatientQueueService],
  exports: [PatientQueueService]
})
export class PatientQueueModule {}
