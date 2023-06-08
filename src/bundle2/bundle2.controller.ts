import { Controller, Post, Body, Res } from '@nestjs/common';
import { Bundle2Service } from './bundle2.service';
@Controller('bundle2')
export class Bundle2Controller {
    constructor(private readonly bundle2Service: Bundle2Service) { }

    @Post()
    async processBundle(@Body() bundle: any): Promise<any> {
        const entries = bundle.data.entry;
        const result =  await this.bundle2Service.processBundle(entries);
        return result;
    }
}