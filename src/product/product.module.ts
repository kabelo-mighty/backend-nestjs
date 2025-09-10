import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product_information } from './product.entity';
import { ProductService } from './service/product.service';
import { ProductResolver } from './product.resolver';
import { ProductController } from './controller/product.controller';
@Module({
    imports: [TypeOrmModule.forFeature([product_information])],
    providers: [ProductService, ProductResolver],
    controllers: [ProductController],
})
export class ProductModule { }