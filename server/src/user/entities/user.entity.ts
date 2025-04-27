import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Todo } from 'src/todo/entities/todo.entity';

import { Column, Entity, ObjectIdColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  admin: boolean;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: false })
  password_hash: string;
}
