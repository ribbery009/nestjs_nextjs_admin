import { UserService } from '../user/user.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class AuthController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(body: RegisterDto, request: Request): Promise<any>;
    login(body: LoginDto, response: Response): Promise<{
        message: string;
    }>;
    user(request: Request): Promise<any>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    updateInfo(request: Request, first_name: string, last_name: string, email: string): Promise<any>;
    updatePassword(request: Request, password: string, password_confirm: string): Promise<any>;
}
