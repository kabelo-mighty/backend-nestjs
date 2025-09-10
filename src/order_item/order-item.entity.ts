import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()

@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn()
    order_item_id: number;

    @Column()
    order_id: number;


    @Field()
    @Column()
    product_code: string;

    @Field()
    @Column()
    product_name: string;

    @Column("int")
    quantity: number;

    @Column("decimal", { precision: 10, scale: 2 })
    price_per_unit: number;

    @Column("decimal", { precision: 10, scale: 2 })
    total_price: number;

}
