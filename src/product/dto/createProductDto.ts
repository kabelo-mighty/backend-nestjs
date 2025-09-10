import { IsString, IsEmail } from 'class-validator';

export class CreateProductDto {
    @IsString()
    product_code: string;

    @IsString()
    product_name: string;

    @IsString()
    description: string;

    @IsString()
    image_url: string;

    @IsString()
    category: string;

    @IsString()
    price: number;

    @IsString()
    currency: string;

    @IsString()
    stock_quantity: number;
}