import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class UserService {
    private jwtService;
    constructor(jwtService: JwtService);
    RegisterUser(userData: JSON): Promise<unknown>;
    Login(email: string, password: string, response: Response): Promise<{
        login: boolean;
        message: string;
    }>;
    ConfirmUser(request: Request): Promise<any>;
    Logout(response: Response): {
        message: string;
    };
    DeleteUser(body: JSON): Promise<unknown>;
    PatchUser(body: JSON): Promise<unknown>;
    dbTest(userData: JSON): Promise<JSON>;
}
