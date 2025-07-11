import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number; // <- use ! to tell TS “I will handle this”

  @Column()
  title!: string;

  @Column()
  content!: string;
}