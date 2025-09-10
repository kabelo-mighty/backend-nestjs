import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class user_information {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    user_id: number;

    @Field()
    @Column()
    first_name: string;

    @Field()
    @Column()
    last_name: string;

    @Field()
    @Column()
    date_of_birth: string;

    @Field()
    @Column()
    gender: string;

    @Field()
    @Column()
    address_line_1: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    address_line_2: string;

    @Field()
    @Column()
    city: string;

    @Field()
    @Column()
    state: string;

    @Field()
    @Column()
    postal_code: string;

    @Field()
    @Column()
    country: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    phone_number: string;

    @Field()
    @Column()
    username: string;

    @Field()
    @Column()
    password: string;

    @Field(type => [String])
    @Column("simple-array")
    roles: string[];
}