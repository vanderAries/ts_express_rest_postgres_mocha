import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Task {
  @PrimaryKey({ type: 'uuid' })
    id = uuidv4();

  @Property()
    name!: string;

  @Property({ type: 'text' })
    description = '';

  @Property()
    category!: string;

  @Property()
    state!: string;

  @Property()
    createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}
