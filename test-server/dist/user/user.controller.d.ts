import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(): void;
    createUser(): void;
    deleteUser(): void;
    patchUser(): void;
}
