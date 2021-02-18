import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly autuService;
    constructor(autuService: AuthService);
    userAuth(body: JSON): any;
}
