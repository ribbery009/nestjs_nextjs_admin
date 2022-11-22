import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

    constructor(private readonly userService: UserService) {

    }

    @UseGuards(AuthGuard)
    @Get('admin/ambassador')
    async ambassadors() {
        return this.userService.find({
            is_ambassador: true
        })
    }
}
