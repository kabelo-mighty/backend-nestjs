import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field()
    user_id: number;

    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    date_of_birth: string;

    @Field()
    gender: string;

    @Field()
    address_line_1: string;

    @Field()
    address_line_2: string;

    @Field()
    city: string;

    @Field()
    state: string;

    @Field()
    postal_code: string;

    @Field()
    country: string;

    @Field()
    email: string;

    @Field()
    phone_number: string;

    @Field()
    username: string;

    @Field()
    password: string;

    @Field(() => [String])
    roles: string[];
}