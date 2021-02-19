import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(body: JSON): Promise<{
        login: boolean;
        message: string;
    }>;
    createUser(body: JSON): Promise<unknown>;
    deleteUser(body: JSON): Promise<unknown>;
    patchUser(body: JSON): Promise<unknown>;
    dbTest(body: JSON): Promise<JSON>;
}
