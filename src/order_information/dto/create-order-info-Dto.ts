import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateOrderInfoDto {
  @Field(() => Int)
  user_id: number;

  @Field() // NestJS handles Date, mapping it to an ISO string
  order_date: Date;

  @Field(() => Float) // Use Float for currency to allow for decimals
  order_total: number;

  @Field()
  payment_status: string;

  @Field()
  shipping_status: string;

  @Field({ nullable: true })
  additional_notes?: string;
}