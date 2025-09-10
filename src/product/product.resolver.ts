import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './service/product.service';
import { product_information } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';

@Resolver(of => product_information)
@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService) { }

    @Query(returns => [product_information])
    products() {
        return this.productService.findAll();
    }

    @Query(returns => product_information)
    product(@Args('id', { type: () => Int }) id: number) {
        return this.productService.findOne(id);
    }

    @Mutation(returns => product_information)
    createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
        return this.productService.create(createProductInput);
    }

    @Mutation(returns => product_information)
    updateProduct(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateProductInput') updateProductInput: CreateProductInput,
    ) {
        return this.productService.update(id, updateProductInput);
    }

    @Mutation(returns => Boolean)
    async deleteProduct(@Args('id', { type: () => Int }) id: number) {
        await this.productService.delete(id);
        return true;
    }
}
