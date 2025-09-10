import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrderInfo } from '../order_information/order-info.entity';

@ObjectType()
@Entity("payment")
export class Payment {
    @PrimaryGeneratedColumn()
    payment_id: number;

    @Field()
    @Column()
    order_id: number;

    @Field()
    @Column()
    payment_method: string;

    @Field()
    @Column("datetime")
    payment_date: Date;

    @Field()
    @Column("decimal", { precision: 10, scale: 2 })
    payment_amount: number;

    @Field()
    @Column({ length: 50 })
    payment_status: string;

    //   @OneToOne(() => OrderInfo, (order) => order.payments, { onDelete: "CASCADE" })
    //   @JoinColumn({ name: "order_id" })
    //   order: OrderInfo;
}

