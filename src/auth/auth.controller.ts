import { Controller, Body, Post, BadRequestException, NotFoundException, Res, Get, Req, UseInterceptors, ClassSerializerInterceptor, UseGuards, Put } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {

    }


    @Post(['admin/register', 'ambassador/register'])
    async register(
        @Body() body: RegisterDto,
        @Req() request: Request) {

        const { password_confirm, ...data } = body;

        if (body.password !== password_confirm) {
            throw new BadRequestException("Passwords do not match!")
        }

        const hashed = await bcrypt.hash(body.password, 12);
        
        return this.userService.save({
            ...data,
            password: hashed,
            is_ambassador: request.path === '/api/ambassador/register'        });
    }

    @Post(['admin/login', 'ambassador/login'])
    async login(@Body() body: LoginDto, @Res({ passthrough: true }) response: Response) {
        const user = await this.userService.findOneByEmail(body.email);

        if (!user) {
            throw new NotFoundException("User not found")
        }

        if (!await bcrypt.compare(body.password, user.password)) {
            throw new BadRequestException('Invalid credentials')
        }

        const jwt = await this.jwtService.signAsync({ id: user.id });
        response.cookie('jwt', jwt, { httpOnly: true });

        return { message: 'success' };
    }

    @UseGuards(AuthGuard)
    @Get(['admin/user', 'ambassador/user'])
    async user(@Req() request: Request) {
        const cookie = request.cookies['jwt'];

        const { id } = await this.jwtService.verifyAsync(cookie);

        const user = await this.userService.findOneById(id)
        return user;
    }

    @UseGuards(AuthGuard)
    @Post(['admin/logout', 'ambassador/logout'])
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'success'
        }
    }

    @UseGuards(AuthGuard)
    @Put(['admin/users/info', 'ambassador/users/info'])
    async updateInfo(
        @Req() request: Request,
        @Body('first_name') first_name: string,
        @Body('last_name') last_name: string,
        @Body('email') email: string,
    ) {
        const cookie = request.cookies['jwt'];
        const { id } = await this.jwtService.verifyAsync(cookie);

        await this.userService.update(id, {
            first_name,
            last_name,
            email
        })

        return this.userService.findOneById(id);


    }

    @UseGuards(AuthGuard)
    @Put(['admin/users/password', 'ambassador/users/password'])
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,

    ) {

        if (password !== password_confirm) {
            throw new BadRequestException("Passwords do not match!")
        }


        const cookie = request.cookies['jwt'];
        const { id } = await this.jwtService.verifyAsync(cookie);

        await this.userService.update(id, {
            password: await bcrypt.hash(password,12)
        })

        return this.userService.findOneById(id);


    }
}
