import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Payment } from '../payment/payment.entity';
import { OrderItem } from 'src/order_item/order-item.entity';
import { user_information } from 'src/user/user.entity';

@Entity('order_information')
export class OrderInfo {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  user_id: number;

  @Column({ type: 'datetime' })
  order_date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  order_total: number;

  @Column({ length: 50 })
  payment_status: string;

  @Column({ length: 50 })
  shipping_status: string;

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
