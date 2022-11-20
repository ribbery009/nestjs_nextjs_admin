"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const product_create_dto_1 = require("./dtos/product-create.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService, cacheManager) {
        this.productService = productService;
        this.cacheManager = cacheManager;
    }
    async all() {
        return this.productService.find();
    }
    async create(body) {
        return this.productService.save(body);
    }
    async get(id) {
        return this.productService.findOneById(id);
    }
    async update(id, body) {
        await this.productService.update(id, body);
        return this.productService.findOneById(id);
    }
    async delete(id) {
        return this.productService.delete(id);
    }
    async frontend() {
        return this.productService.find();
    }
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
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("admin/products"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)("admin/products"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_create_dto_1.ProductCreateDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("admin/products/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "get", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)("admin/products/:id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, product_create_dto_1.ProductCreateDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('admin/products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.CacheKey)('products_frontend'),
    (0, common_1.CacheTTL)(1800),
    (0, common_1.Get)('ambassador/products/frontend'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "frontend", null);
__decorate([
    (0, common_1.Get)('ambassador/products/backend'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "backend", null);
ProductController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [product_service_1.ProductService, Object])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map