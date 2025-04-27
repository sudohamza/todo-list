import { ObjectId } from 'mongodb';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn } from 'typeorm';

@Entity()
export class Todo {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  done: boolean;

  userId: ObjectId;
}
