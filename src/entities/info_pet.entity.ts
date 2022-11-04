import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Info_pet {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({nullable: true})
    pet_image: string

    @Column()
    size: string

    @Column({nullable: true})
    color: string

    @Column()
    species: string

    @Column({nullable: true})
    description: string

    @Column({nullable: true})
    vaccine: string
}