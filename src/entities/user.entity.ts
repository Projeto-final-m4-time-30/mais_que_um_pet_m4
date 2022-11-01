import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { Address } from './address.entity'
import { Contact } from './contact.entity'

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToOne(() => Address, { eager: true })
    @JoinColumn()
    address: Address

    @OneToOne(() => Contact, { eager: true })
    @JoinColumn()
    contact: Contact

}
