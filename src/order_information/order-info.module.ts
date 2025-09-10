import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderInfo } from './order-info.entity';
import { orderInfoService } from './service/order-info.service';
import { OrderInfoController } from './controller/order-info.controller';
import { OrderInfoResolver } from './order-info.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([OrderInfo])],
    providers: [orderInfoService, OrderInfoResolver],
    controllers: [OrderInfoController],
})
export class OrderInfoModule { }