import { UserService } from './user.service';
import { Response, Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    Login(email: string, password: string, response: Response): Promise<{
        login: boolean;
        message: string;
    }>;
    logout(response: Response): {
        message: string;
    };
    ConfirmUser(request: Request): Promise<any>;
    createUser(body: JSON): Promise<unknown>;
    deleteUser(body: JSON): Promise<unknown>;
    patchUser(body: JSON): Promise<unknown>;
    dbTest(body: JSON): Promise<JSON>;
}
