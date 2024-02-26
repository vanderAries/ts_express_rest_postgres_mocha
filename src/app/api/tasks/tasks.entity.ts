import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export default class Task {
  @PrimaryKey()
    id!: number;

  @Property()
    title!: string;
}
