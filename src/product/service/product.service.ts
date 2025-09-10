import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { product_information } from '../product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(product_information)
        private productRepository: Repository<product_information>,
    ) { }

    findAll(): Promise<product_information[]> {
        return this.productRepository.find();
    }

    findOne(id: number): Promise<product_information> {
        return this.productRepository.findOneBy({ user_id: id });
    }

    async create(createProductDto: Partial<product_information>): Promise<product_information> {
        return this.productRepository.save(createProductDto);
    }

    async update(id: number, product: Partial<product_information>): Promise<product_information> {
        await this.productRepository.update(id, product);
        return this.productRepository.findOneBy({ product_id: id });
    }

    async delete(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}