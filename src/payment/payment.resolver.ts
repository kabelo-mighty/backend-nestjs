import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { paymentService } from './service/payment.service';
import { Payment } from './payment.entity';
import { CreatePaymentInput } from './dto/payment.input';

@Resolver(of => Payment)
@Resolver()
export class PaymentResolver {
    constructor(private readonly paymentService: paymentService) { }

    @Query(returns => [Payment])
    payments() {
        return this.paymentService.findAll();
    }

    @Query(returns => Payment)
    payment(@Args('id', { type: () => Int }) id: number) {
        return this.paymentService.findOne(id);
    }

    @Mutation(returns => Payment)
    createPayment(@Args('createPaymentInput') createPaymentInput: CreatePaymentInput) {
        return this.paymentService.create(createPaymentInput);
    }
}
