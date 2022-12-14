import { Repository } from "typeorm";
export declare abstract class AbstractService {
    protected readonly repository: Repository<any>;
    protected constructor(repository: Repository<any>);
    save(options: any): Promise<any>;
    find(options?: {}): Promise<any[]>;
    findByRelation(relation: any): Promise<any[]>;
    findOneByEmail(options: any): Promise<any>;
    findOneByIDAndRelations(options: any, relations: any): Promise<any>;
    findOneByUserAndRelations(options: any, relations: any): Promise<any>;
    findOneById(options: any): Promise<any>;
    update(id: number, options: any): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    findOne(options: any): Promise<any>;
}
