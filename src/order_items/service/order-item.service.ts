import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../order-item.entity';

@Injectable()
export class orderItemService {
    constructor(
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
    ) { }

    findAll(): Promise<OrderItem[]> {
        return this.orderItemRepository.find();
    }

    findOne(id: number): Promise<OrderItem> {
        return this.orderItemRepository.findOneBy({ order_item_id: id });
    }

    async create(createOrderItemDto: Partial<OrderItem>): Promise<OrderItem> {
        return this.orderItemRepository.save(createOrderItemDto);
    }

    async update(id: number, orderItem: Partial<OrderItem>): Promise<OrderItem> {
        await this.orderItemRepository.update(id, orderItem);
        return this.orderItemRepository.findOneBy({ order_item_id: id });
    }

    async delete(id: number): Promise<void> {
        await this.orderItemRepository.delete(id);
    }
}