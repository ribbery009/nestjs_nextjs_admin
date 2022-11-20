import { Body, CacheInterceptor, CacheKey, CacheTTL, CACHE_MANAGER, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductService } from './product.service';
import { Cache } from 'cache-manager'

@Controller()
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {

    }

    @UseGuards(AuthGuard)
    @Get("admin/products")
    async all() {
        return this.productService.find();
    }

    @UseGuards(AuthGuard)
    @Post("admin/products")
    async create(@Body() body: ProductCreateDto) {
        return this.productService.save(body);
    }

    @UseGuards(AuthGuard)
    @Get("admin/products/:id")
    async get(@Param('id') id: number) {
        return this.productService.findOneById(id);
    }

    @UseGuards(AuthGuard)
    @Put("admin/products/:id")
    async update(@Param('id') id: number,
        @Body() body: ProductCreateDto) {
        await this.productService.update(id, body);
        return this.productService.findOneById(id);
    }

    @UseGuards(AuthGuard)
    @Delete('admin/products/:id')
    async delete(@Param('id') id: number) {
        return this.productService.delete(id);
    }

    @UseInterceptors(CacheInterceptor)
    @CacheKey('products_frontend')
    @CacheTTL(1800)
    @Get('ambassador/products/frontend')
    async frontend() {
        return this.productService.find();
    }

    @Get('ambassador/products/backend')
    async backend() {
        let products = await this.cacheManager.get('products_backend');


        if (!products) {
            products = await this.productService.find();

            await this.cacheManager.set('products_backend', products);
            const cachedData = await this.cacheManager.get('products_backend');
            console.log('data set to cache', cachedData);

            await this.cacheManager.set('products_backend', products, 1800);
        }
        return products;
    }
}

