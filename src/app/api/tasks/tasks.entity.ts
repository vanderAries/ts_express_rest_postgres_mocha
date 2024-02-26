import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import uuid from 'uuid';

@Entity()
export default class Task {
  @PrimaryKey({ type: 'uuid' })
    id = uuid.v4();

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
