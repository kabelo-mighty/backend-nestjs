import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

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

    //   @OneToOne(() => OrderInformation, (order) => order.payment, { onDelete: "CASCADE" })
    //   @JoinColumn({ name: "order_id" })
    //   order: OrderInformation;
}

