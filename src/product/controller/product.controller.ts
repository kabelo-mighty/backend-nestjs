import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateProductDto } from '../dto/createProductDto';
import { product_information } from '../product.entity';
import { ProductService } from '../service/product.service';


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

@Get()
async findAll(): Promise<product_information[]> {
  try {
    const products = await this.productService.findAll();
    if (!products || products.length === 0) {
      throw new NotFoundException('No products found');
    }
    return products;
  } catch (error) {
    throw new NotFoundException('An error occurred while fetching products');
  }
}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<product_information> {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
@Delete(':id')
async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
  try {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new NotFoundException(`product with ID ${id} not found`);
    }
    await this.productService.delete(id);
    return { message: `product with ID ${id} has been successfully deleted` };
  } catch (error) {
    throw new NotFoundException(`An error occurred while deleting the product with ID ${id}`);
  }
}

@Post()
async createProduct(@Body() createProductDto: CreateProductDto): Promise<{ message: string; product: product_information }> {
  try {
    const product = await this.productService.create(createProductDto);
    return { message: 'product successfully created', product };
  } catch (error) {
    throw new BadRequestException('An error occurred while adding the product');
  }
}
@Put(':id')
async updateProduct(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateProductDto: Partial<CreateProductDto>,
): Promise<{ message: string; product: product_information }> {
  try {
    const existingProduct = await this.productService.findOne(id);
    if (!existingProduct) {
      throw new NotFoundException(`product with ID ${id} not found`);
    }
    const updatedProduct = await this.productService.update(id, updateProductDto);
    return { message: `Product with ID ${id} successfully updated`, product: updatedProduct };
  } catch (error) {
    throw new BadRequestException(`An error occurred while updating the product with ID ${id}`);
  }
}
}