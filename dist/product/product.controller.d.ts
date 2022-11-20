import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductService } from './product.service';
import { Cache } from 'cache-manager';
export declare class ProductController {
    private readonly productService;
    private cacheManager;
    constructor(productService: ProductService, cacheManager: Cache);
    all(): Promise<any[]>;
    create(body: ProductCreateDto): Promise<any>;
    get(id: number): Promise<any>;
    update(id: number, body: ProductCreateDto): Promise<any>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    frontend(): Promise<any[]>;
    backend(): Promise<unknown>;
}
