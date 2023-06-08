import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as schedule from 'node-schedule';
import { BundleService } from './bundle/bundle.service';
import { Bundle2Service } from './bundle2/bundle2.service';
import { PatientQueueService } from './patient-queue/patient-queue.service';

@Injectable()
export class CronService implements OnApplicationBootstrap {

  constructor(
    private readonly bundleService: BundleService,
    private readonly bundle2Service: Bundle2Service,
    private readonly patientQueueService: PatientQueueService,
  ) { }

  onApplicationBootstrap() {
    console.log('Running cron job');
    this.startCronJob();
  }

  private startCronJob() {
    schedule.scheduleJob('*/1 * * * *', async () => {
      await this.bundleService.processEntries();
      await this.bundle2Service.proccessBundle2s();
      await this.patientQueueService.processPatients();
    }
    );
  }
}
