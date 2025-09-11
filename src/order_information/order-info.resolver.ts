import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderInfoService } from './service/order-info.service';
import { OrderInfo } from './order-info.entity';
import { CreateOrderInfoInput } from './dto/create-order-info.input';
export class OrderInfoResolver {
    constructor(private readonly orderInfoService: OrderInfoService) { } // <- Correct service type

    @Query(returns => [OrderInfo])
    orderInfos() { // <- Renamed for clarity
        return this.orderInfoService.findAll();
    }

    @Query(returns => OrderInfo)
    orderInfo(@Args('id', { type: () => Int }) id: number) {
        return this.orderInfoService.findOne(id);
    }

    @Mutation(returns => OrderInfo)
    createOrderInfo(@Args('createOrderInfoInput') createOrderInfoInput: CreateOrderInfoInput) {
        return this.orderInfoService.create(createOrderInfoInput);
    }

    @Mutation(returns => OrderInfo)
    updateOrderInfo(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateOrderInfoInput') updateOrderInfoInput: CreateOrderInfoInput, // <- Use Update DTO
    ) {
        return this.orderInfoService.update(id, updateOrderInfoInput);
    }

    @Mutation(returns => Boolean)
    async deleteOrderInfo(@Args('id', { type: () => Int }) id: number) {
        await this.orderInfoService.delete(id);
        return true;
    }
}

