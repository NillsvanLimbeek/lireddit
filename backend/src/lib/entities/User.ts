import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
