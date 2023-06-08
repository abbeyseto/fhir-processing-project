import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientQueue } from './patient-queue.entity';

@Injectable()
export class PatientQueueService {
    constructor(@InjectRepository(PatientQueue) private patientRepository: Repository<PatientQueue>) { }

    async processBundle(bundle: any): Promise<any> { //TODO: change any to Bundle type
        const timestamp = new Date();
        let errors = [];
        for (const entry of bundle) {
            try {
                if (entry?.resource?.resourceType === 'Patient') {
                    const patient = new PatientQueue();
                    patient.uniqueId = entry.resource.id;
                    patient.entry = entry;
                    patient.timestamp = timestamp;
                    await this.patientRepository.save(patient);
                }
            } catch (error) {
                errors.push(error.message);
            }

        }
        if (errors.length > 0) {
            return { message: 'Some errors occurred while processing the bundle', errors };
        } else {
            return { message: 'Bundle processed successfully' };
        }
    }

    async getPatients(): Promise<PatientQueue[]> {
        return this.patientRepository.find({ order: { timestamp: 'ASC' } });
    }

    async processPatients(): Promise<void> {
        const patients = await this.getPatients();
        if (patients.length === 0) {
            console.log('No patients to process on PostgreSQL');
            return;
        }
        for (const patient of patients) {
            await this.processPatient(patient);
        }
    }

    async processPatient(patient: PatientQueue) {
        console.log('Processing patient from Postgres:', patient.id);
        this.deletePatient(patient.id);
    }

    async deletePatient(id: string): Promise<void> {
        this.patientRepository.delete({ id });
    }
}
