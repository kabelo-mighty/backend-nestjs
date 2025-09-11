import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Payment } from '../payment/payment.entity';
import { OrderItem } from 'src/order_item/order-item.entity';
import { user_information } from 'src/user/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Entity('order_information')
export class OrderInfo {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Field()
  @Column()
  user_id: number;

  @Field()
  @Column({ type: 'datetime' })
  order_date: Date;

  @Field()
  @Column('decimal', { precision: 10, scale: 2 })
  order_total: number;

  @Field()
  @Column({ length: 50 })
  payment_status: string;

  @Field()
  @Column({ length: 50 })
  shipping_status: string;
  
  @Field()
  @Column({ type: 'text', nullable: true })
  additional_notes?: string;

  // Relations
  // @ManyToOne(() => user_information, (user) => user, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'user_id' })
  // user: user_information;

  // @OneToMany(() => OrderItem, (orderItem) => orderItem)
  // order_items: OrderItem[];

  // @OneToMany(() => Payment, (payment) => payment)
  // payments: Payment[];
}
