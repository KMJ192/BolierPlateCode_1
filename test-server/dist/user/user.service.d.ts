import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class UserService {
    private jwtService;
    constructor(jwtService: JwtService);
    RegisterUser(userData: JSON, user_image: string): Promise<{
        result: boolean;
        message: string;
    }>;
    Login(email: string, password: string, response: Response): Promise<{
        login: boolean;
        message: string;
    }>;
    ConfirmUser(request: Request): Promise<{
        useremail: string;
        nickname: string;
        user_image: string;
        result: boolean;
        message: string;
    }>;
    Logout(response: Response): Promise<{
        message: string;
    }>;
    DeleteUser(email: string, response: Response): Promise<unknown>;
    PatchUser(userData: JSON, user_image: string): Promise<{
        patch: boolean;
        message: string;
    }>;
    EmailConfirm(email: string): Promise<{
        result: any;
    }>;
    NicknameConfirm(nickname: string): Promise<{
        result: any;
    }>;
}
