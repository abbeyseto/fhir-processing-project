import { Module } from '@nestjs/common';
import { Bundle2Service } from './bundle2.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bundle2, Bundle2Schema } from './bundle2.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bundle2.name, schema: Bundle2Schema }]),
  ],
  providers: [Bundle2Service],
  exports: [Bundle2Service]
})
export class Bundle2Module {}
