import { Repository } from "typeorm";

export abstract class AbstractService {

    protected constructor(
        protected readonly repository: Repository<any>
    ) {

    }

    async save(options) {
        return this.repository.save(options);
    }

    async find(options = {}) {
        return this.repository.find(options);
    }

    async findOneByEmail(options) {
        return this.repository.findOne({
            where:
                { email: options }
        });
    }

    async findOneByIDAndRelations(options, relations) {
        return this.repository.findOne({
            where:
                { id: options },
            relations: relations
        });
    }

    async findOneById(options) {
        return this.repository.findOne({
            where:
                { id: options }
        });
    }

    async update(id: number, options) {
        return this.repository.update(id, options);
    }

    async delete(id: number) {
        return this.repository.delete(id);
    }

    async findOne(options) {
        return this.repository.findOne(options);
    }
}
