import { AbstractService } from "../shared/abstract.service";
import { Link } from "./link";
import { Repository } from "typeorm";
export declare class LinkService extends AbstractService {
    private readonly linkRepository;
    constructor(linkRepository: Repository<Link>);
}
