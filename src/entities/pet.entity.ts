import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm'


@Entity()
export class Pet {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    name: string

    @Column()
    is_adoptable: string

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
}