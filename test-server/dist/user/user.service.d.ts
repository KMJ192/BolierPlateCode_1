export declare class UserService {
    getUser(body: JSON): Promise<{
        login: boolean;
        message: string;
    }>;
    createUser(userData: JSON): Promise<unknown>;
    deleteUser(body: JSON): Promise<unknown>;
    patchUser(body: JSON): Promise<unknown>;
    dbTest(userData: JSON): Promise<JSON>;
}
