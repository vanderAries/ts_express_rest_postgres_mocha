import {
  Entity,
  PrimaryKey,
  Property,
  type Opt,
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { type TaskState } from './tasks.models';

@Entity()
export default class Task {
  @PrimaryKey({ type: 'uuid' })
    id = uuidv4();

  @Property()
    name!: string;

  @Property({ nullable: true })
    description?: string;

  @Property()
    category!: string;

  @Property({ default: 'todo' })
    state?: string & Opt = 'todo' satisfies TaskState;

  @Property()
    createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}
