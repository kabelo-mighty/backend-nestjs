import { Field, ObjectType, Int, Float } from "@nestjs/graphql";

@ObjectType()
export class createOrderItemDto {
  @Field(() => Int)
  order_item_id: number;

  @Field(() => Int)
  order_id: number;

  @Field()
  product_code: string;

  @Field()
  product_name: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price_per_unit: number;

  @Field(() => Float)
  total_price: number;
}