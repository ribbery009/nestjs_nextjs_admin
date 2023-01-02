import { RedisService } from 'src/shared/redis_service';
import { UserService } from './user.service';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    private redisService;
    constructor(userService: UserService, redisService: RedisService);
    ambassadors(): Promise<any[]>;
    rankings(response: Response): Promise<void>;
}
