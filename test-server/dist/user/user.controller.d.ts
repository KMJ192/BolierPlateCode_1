import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(body: JSON): void;
    createUser(body: JSON): void;
    deleteUser(body: JSON): void;
    patchUser(): void;
}
