import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Bundle2Document = Bundle2 & Document;

@Schema()
export class Bundle2 {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: Object, required: true })
  entry: Record<string, unknown>;

  @Prop({ type: Date, required: true, default: Date.now })
  timestamp: Date;
}

export const Bundle2Schema = SchemaFactory.createForClass(Bundle2);
