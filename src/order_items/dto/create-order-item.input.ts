import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderItemInput {
    @Field()
    order_id: number;

    @Field()
    product_code: string;

    @Field()
    product_name: string;

    @Field()
    quantity: number;

    @Field()
    price_per_unit: number;

    @Field()
    total_price: number;
}