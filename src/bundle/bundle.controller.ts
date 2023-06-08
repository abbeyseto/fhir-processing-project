import { Controller, Post, Body } from '@nestjs/common';
import { BundleService } from './bundle.service';

@Controller('bundle')
export class BundleController {
  constructor(private readonly bundleService: BundleService) { }

  @Post()
  async processBundle(@Body() bundle: any): Promise<void> {
    const entries = bundle.data.entry;
    for (const entry of entries) {
      await this.bundleService.saveEntry(entry);
    }
    return Promise.resolve();
  }
}
