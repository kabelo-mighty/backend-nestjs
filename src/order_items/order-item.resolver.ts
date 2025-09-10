import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { orderItemService } from './service/order-item.service';
import { OrderItem } from './order-item.entity';
import { CreateOrderItemInput } from './dto/create-order-item.input';

@Resolver(of => OrderItem)
@Resolver()
export class OrderItemResolver {
    constructor(private readonly orderItemtService: orderItemService) { }

    @Query(returns => [OrderItem])
    orderItems() {
        return this.orderItemtService.findAll();
    }

    @Query(returns => OrderItem)
    orderItem(@Args('id', { type: () => Int }) id: number) {
        return this.orderItemtService.findOne(id);
    }

    @Mutation(returns => OrderItem)
    createOrderItem(@Args('createOrderItemInput') createOrderItemInput: CreateOrderItemInput) {
        return this.orderItemtService.create(createOrderItemInput);
    }

    @Mutation(returns => OrderItem)
    updateOrderItem(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateOrderItemInput') updateOrderItemInput: CreateOrderItemInput,
    ) {
        return this.orderItemtService.update(id, updateOrderItemInput);
    }

    @Mutation(returns => Boolean)
    async deleteOrderItem(@Args('id', { type: () => Int }) id: number) {
        await this.orderItemtService.delete(id);
        return true;
    }
}
