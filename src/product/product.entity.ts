import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()

export class product_information {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    product_id: number;

    @Field(type => Int)
    @Column('int')
    user_id: number;

    @Field()
    @Column()
    product_code: string;

    @Field()
    @Column()
    product_name: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    image_url: string;

    @Field()
    @Column()
    category: string;

    @Field(type => Int)
    @Column('int')
    price: number;

    @Field()
    @Column()
    currency: string;

    @Field(type => Int)
    @Column('int')
    stock_quantity: number;
}