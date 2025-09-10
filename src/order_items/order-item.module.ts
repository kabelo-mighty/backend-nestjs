import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './order-item.entity';
import { orderItemService } from './service/order-item.service';
import { OrderItemResolver } from './order-item.resolver';
import { OrderItemController } from './controller/order-item.controller';
@Module({
    imports: [TypeOrmModule.forFeature([OrderItem])],
    providers: [orderItemService, OrderItemResolver],
    controllers: [OrderItemController],
})
export class OrderItemModule { }