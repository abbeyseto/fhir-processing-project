import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bundle2, Bundle2Document } from './bundle2.entity';

@Injectable()
export class Bundle2Service {
    constructor(@InjectModel(Bundle2.name) private bundle2Model: Model<Bundle2Document>) { }

    async processBundle(bundle: any): Promise<any> { //TODO: change any to Bundle type
        const timestamp = new Date();
        let errors = [];
        for (const entry of bundle) {
            try {
                if (entry?.resource?.resourceType === 'Patient') {
                    const bundle2 = new this.bundle2Model({
                        id: entry.resource.id,
                        entry: entry.resource,
                        timestamp,
                    });
                    await bundle2.save();
                }
            } catch (error) {
                errors.push(error.message);
            }
        }
        if (errors.length > 0) {
            return { message: 'Some errors occurred while processing the bundle', errors };
        } else {
            return{message :'Bundle processed successfully'};
        }
    }

    async getBundle2s(): Promise<Bundle2[]> {
        // return all bundle2s from the database sorted by timestamp
        return this.bundle2Model.find().sort({ timestamp: 'desc' }).exec();
    }

    async proccessBundle2s(): Promise<void> {
        const bundle2s = await this.getBundle2s();
        if (bundle2s.length === 0) {
            console.log('No bundle2s to process on MongoDB');
            return;
        }
        for (const bundle2 of bundle2s) {
            await this.processBundle2(bundle2);
        }
    }

    async processBundle2(bundle2: Bundle2) {
        console.log('Processing bundle2 from Mongodb:', bundle2.id);
        // TODO: Create a new patient on the FHIR server
        await this.deleteBundle2(bundle2.id);
    }

    async deleteBundle2(id: string): Promise<void> {
        this.bundle2Model.deleteOne({ id }).exec();
    }
}
