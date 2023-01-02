import {CacheModule, Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import * as redisStore from 'cache-manager-redis-store';
import type { ClientOpts } from 'redis';
import { RedisService } from './redis_service';

@Module({
    imports: [
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '1d'}
        }),
        CacheModule.register<ClientOpts>({
            isGlobal: true,
            store:redisStore,
            host: 'redis',
            port: 6379,
          })
    ],
    providers:[RedisService],
    exports: [
        JwtModule,
        CacheModule,
        RedisService
    ]
})
export class SharedModule {
}