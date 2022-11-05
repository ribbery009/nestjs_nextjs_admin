import { Controller, Body, Post, BadRequestException, NotFoundException, Res, Get, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller()
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {

    }

    @Post('/admin/register')
    async register(@Body() body: RegisterDto) {

        const { password_confirm, ...data } = body;

        if (body.password !== password_confirm) {
            throw new BadRequestException("Passwords do not match!")
        }

        const hashed = await bcrypt.hash(body.password, 12);
        return this.userService.save({
            ...data,
            password: hashed,
            is_ambassador: false
        });
    }

    @Post('/admin/login')
    async login(@Body() body: LoginDto, @Res({passthrough:true}) response: Response) {
        const user = await this.userService.findOneByEmail(body.email);

        if (!user) {
            throw new NotFoundException("User not found")
        }

        if (!await bcrypt.compare(body.password, user.password)) {
            throw new BadRequestException('Invalid credentials')
        }

            const jwt = await this.jwtService.signAsync({ id: user.id });
            response.cookie('jwt', jwt, { httpOnly: true });

        return {message: 'success'};
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/admin/user')
    async user(@Req() request: Request) {
        const cookie = request.cookies['jwt'];

        const { id } = await this.jwtService.verifyAsync(cookie);

        const user = await this.userService.findOneById(id)
        return user;
    }
}
