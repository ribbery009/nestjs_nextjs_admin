import {CacheModule, Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import * as redisStore from 'cache-manager-redis-store';
import type { ClientOpts } from 'redis';

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
    exports: [
        JwtModule,
        CacheModule
    ]
})
export class SharedModule {
}