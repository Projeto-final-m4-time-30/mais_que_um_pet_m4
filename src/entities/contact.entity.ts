import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    phone: string

    @Column({ nullable: true })
    secondary_email: string

    @Column({ nullable: true })
    whatsapp: string

    @Column({ nullable: true })
    description: string

}