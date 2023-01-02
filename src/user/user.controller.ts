import { ClassSerializerInterceptor, Controller, Get, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { RedisService } from 'src/shared/redis_service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './user';
import { UserService } from './user.service';
import { Response } from 'express'

@UseGuards(AuthGuard)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

    constructor(
        private readonly userService: UserService,
        private redisService: RedisService) {

    }

    @UseGuards(AuthGuard)
    @Get('admin/ambassador')
    async ambassadors() {
        return this.userService.find({
            is_ambassador: true
        })
    }

    @Get('ambassador/rankings')
    async rankings(
        @Res() response: Response
    ) {
        const client = this.redisService.getClient();

        client.zrevrangebyscore('rankings', '+inf', '-inf', 'withscores', (err: Error | null, result: string[]) => {
            let score;
            response.send(result.reduce((o: {}, r: string) => {
                if (isNaN(parseInt(r))) {
                    return {
                        ...o,
                        [r]: score
                    }
                } else {
                    score = parseInt(r);
                    return o;
                }
            }, {}));
        })

    }

}
