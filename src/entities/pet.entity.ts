import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne } from 'typeorm'
import { Info_pet } from './info_pet.entity'


@Entity()
export class Pet {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    name: string

    @Column()
    is_adoptable: boolean

    @Column()
    is_active: boolean

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string

    @OneToOne(() => Info_pet, {eager: true})
    @JoinColumn()
    info_pet: Info_pet

    @Column()
    donor_id: string
}