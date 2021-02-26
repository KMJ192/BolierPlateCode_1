import { UserAuthService } from './user-auth.service';
import { Response, Request } from 'express';
export declare class UserAuthController {
    private readonly userAuthService;
    constructor(userAuthService: UserAuthService);
    RegisterUser(body: JSON): Promise<{
        registerd: boolean;
        message: string;
    }>;
    Login(email: string, password: string, response: Response): Promise<{
        login: boolean;
        message: string;
    }>;
    ConfirmUser(request: Request): Promise<any>;
    deleteUser(body: JSON): Promise<unknown>;
    patchUser(body: JSON): Promise<unknown>;
}
