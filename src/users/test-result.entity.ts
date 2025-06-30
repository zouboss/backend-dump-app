import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class TestResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  correctAnswers: number;

  @Column()
  totalQuestions: number;

  @Column()
  passed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.testResults)
  user: User;

  @Column()
  userId: number;

  @Column('json', { nullable: true })
  questions: any[];

  @Column('json', { nullable: true })
  selectedAnswers: any;

  @Column('json', { nullable: true })
  correctAnswersList: any[];
} 