"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
class AbstractService {
    constructor(repository) {
        this.repository = repository;
    }
    async save(options) {
        return this.repository.save(options);
    }
    async find(options = {}) {
        return this.repository.find(options);
    }
    async findByRelation(relation) {
        return this.repository.find({ relations: relation });
    }
    async findOneByEmail(options) {
        return this.repository.findOne({
            where: { email: options }
        });
    }
    async findOneByIDAndRelations(options, relations) {
        return this.repository.findOne({
            where: { id: options },
            relations: relations
        });
    }
    async findOneByUserAndRelations(options, relations) {
        return this.repository.findOne({
            where: { user: options },
            relations: relations
        });
    }
    async findOneById(options) {
        return this.repository.findOne({
            where: { id: options }
        });
    }
    async update(id, options) {
        return this.repository.update(id, options);
    }
    async delete(id) {
        return this.repository.delete(id);
    }
    async findOne(options) {
        return this.repository.findOne(options);
    }
}
exports.AbstractService = AbstractService;
//# sourceMappingURL=abstract.service.js.map