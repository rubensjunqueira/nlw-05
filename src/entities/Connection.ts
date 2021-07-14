import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "./User";

@Entity("connections")
export class Connection {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  admin_id: string;

  @Column()
  socket_id: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
