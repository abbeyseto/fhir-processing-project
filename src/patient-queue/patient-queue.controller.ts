import { Controller, Post, Body, } from '@nestjs/common';
import {PatientQueueService} from './patient-queue.service';
@Controller('patient-queue')
export class PatientQueueController {
    constructor(private readonly patientQueueService: PatientQueueService) { }

    @Post()
    async processBundle(@Body() bundle: any): Promise<any> {
        const entries = bundle.data.entry;
        const result =  await this.patientQueueService.processBundle(entries);
        return result;
    }
}
