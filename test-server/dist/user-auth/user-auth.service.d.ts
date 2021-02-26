import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class UserAuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    RegisterUser(userData: JSON): Promise<{
        registerd: boolean;
        message: string;
    }>;
    Login(email: string, password: string, response: Response): Promise<{
        login: boolean;
        message: string;
    }>;
    ConfirmUser(request: Request): Promise<any>;
    DeleteUser(body: JSON): Promise<unknown>;
    PatchUser(body: JSON): Promise<unknown>;
    Logout(response: Response): {
        message: string;
    };
}
