import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderInfo } from '../order-info.entity';

@Injectable()
export class OrderInfoService {
    constructor(
        @InjectRepository(OrderInfo)
        private orderInfoRepository: Repository<OrderInfo>,
    ) { }

    findAll(): Promise<OrderInfo[]> {
        return this.orderInfoRepository.find();
    }

    findOne(id: number): Promise<OrderInfo> {
        return this.orderInfoRepository.findOneBy({ order_id: id });
    }

    async create(createOrderInfoDto: Partial<OrderInfo>): Promise<OrderInfo> {
        return this.orderInfoRepository.save(createOrderInfoDto);
    }

    async update(id: number, orderInfo: Partial<OrderInfo>): Promise<OrderInfo> {
        await this.orderInfoRepository.update(id, orderInfo);
        return this.orderInfoRepository.findOneBy({ order_id: id });
    }

    async delete(id: number): Promise<void> {
        await this.orderInfoRepository.delete(id);
    }
}