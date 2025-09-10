import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
    @Field(type => Int)
    payment_id: number;

    @Field(type => Int)
    order_id: number;

    @Field()
    payment_method: string;

    @Field()
    payment_date: Date;

    @Field(type => Float)
    payment_amount: number;

    @Field()
    payment_status: string;
}