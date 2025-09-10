import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
    @Field()
    user_id: number;

    @Field()
    product_code: string;

    @Field()
    product_name: string;

    @Field()
    description: string;

    @Field()
    image_url: string;

    @Field()
    category: string;

    @Field()
    price: number;

    @Field()
    currency: string;

    @Field()
    stock_quantity: number;
}