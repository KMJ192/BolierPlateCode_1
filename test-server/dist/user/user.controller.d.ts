/// <reference types="multer" />
import { UserService } from './user.service';
import { Response, Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    private filepath;
    login(email: string, password: string, response: Response): Promise<{
        login: boolean;
        message: string;
    }>;
    getUserImage(path: any, response: Response): void;
    logout(response: Response): Promise<{
        message: string;
    }>;
    confirmUser(request: Request): Promise<{
        useremail: string;
        username: string;
        userimage: string;
        result: boolean;
        message: string;
    }>;
    createUser(file: Express.Multer.File, body: JSON): Promise<{
        registerd: boolean;
        message: string;
    }>;
    deleteUser(data: JSON): Promise<unknown>;
    patchUser(file: Express.Multer.File, body: JSON): Promise<{
        patch: boolean;
        message: string;
    }>;
    emailConfirm(body: JSON): void;
    nicknameConfirm(body: JSON): void;
}
