import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

    constructor(private readonly userService: UserService) {

    }
    @Get('admin/ambassador')
    async ambassadors() {
        return this.userService.find({
            is_ambassador: true
        })
    }
}
