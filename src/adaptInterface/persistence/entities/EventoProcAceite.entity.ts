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
