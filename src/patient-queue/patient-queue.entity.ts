import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PatientQueue {
  // primary key in the 'format patient-1'
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  uniqueId: string;

  @Column('json')
  entry: Record<string, unknown>;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
