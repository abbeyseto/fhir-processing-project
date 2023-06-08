import { Module } from '@nestjs/common';
import { BundleService } from './bundle.service';

@Module({
    providers: [BundleService],
    exports: [BundleService],
})
export class BundleModule { }