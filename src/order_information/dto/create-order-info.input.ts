import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInfoInput {
  @Field(() => Int)
  user_id: number;

  @Field(() => Date) // <- This makes order_date a Date
  order_date: Date;

  @Field()
  order_total: number;

  @Field()
  payment_status: string;

  @Field()
  shipping_status: string;

  @Field({ nullable: true })
  additional_notes?: string;
}