import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProcAceite } from './ProcAceite.entity';

@Entity('EventoProcAceite')
export class EventoProcAceite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  titulo: string;

  @Column({
    type: 'date',
    nullable: true,
    transformer: {
      to(value: Date): string {
        console.log(value); // TODO: Arrumar conversão de data
        return value.toISOString().split('T')[0];
      },
      from (value: string): Date {
        return new Date(value);
      }
    }
  })
  data: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  descricao: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  corpo: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @ManyToOne(() => ProcAceite, (procAceite) => procAceite.eventosProcAceite)
  procAceite: ProcAceite;
}
