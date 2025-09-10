import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../payment.entity';

@Injectable()
export class paymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
    ) { }

    findAll(): Promise<Payment[]> {
        return this.paymentRepository.find();
    }

    findOne(id: number): Promise<Payment> {
        return this.paymentRepository.findOneBy({ payment_id: id });
    }

    async create(createOrderItemDto: Partial<Payment>): Promise<Payment> {
        return this.paymentRepository.save(createOrderItemDto);
    }

    async update(id: number, orderItem: Partial<Payment>): Promise<Payment> {
        await this.paymentRepository.update(id, orderItem);
        return this.paymentRepository.findOneBy({ payment_id: id });
    }

    async delete(id: number): Promise<void> {
        await this.paymentRepository.delete(id);
    }
}