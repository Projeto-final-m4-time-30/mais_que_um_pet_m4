import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Info_pet } from "./info_pet.entity";
import { User } from "./user.entity";

@Entity()
export class Pet {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  is_adoptable: boolean;

  @Column()
  is_active: boolean;

  @Column()
  registerUser_id: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @OneToOne(() => Info_pet, { eager: true })
  @JoinColumn()
  info_pet: Info_pet;

  @ManyToOne(() => User, (user) => user.id)
  ownerId: User;
}
