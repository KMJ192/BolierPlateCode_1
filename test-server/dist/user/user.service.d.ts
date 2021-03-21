import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class UserService {
    private jwtService;
    constructor(jwtService: JwtService);
    RegisterUser(userData: JSON, user_image: string): Promise<{
        registerd: boolean;
        message: string;
    }>;
    Login(email: string, password: string, response: Response): Promise<{
        login: boolean;
        message: string;
    }>;
    ConfirmUser(request: Request): Promise<{
        useremail: string;
        username: string;
        userimage: string;
        result: boolean;
        message: string;
    }>;
    Logout(response: Response): Promise<{
        message: string;
    }>;
    DeleteUser(email: string): Promise<unknown>;
    PatchUser(userData: JSON, user_image: string): Promise<{
        patch: boolean;
        message: string;
    }>;
}
