import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({ length: 8})
    cep: string

    @Column()
    city: string

    @Column({length: 2})
    state: string

    @Column()
    district: string

    @Column()
    number: string
}