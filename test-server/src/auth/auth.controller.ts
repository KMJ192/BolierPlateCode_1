import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController { 

    constructor(private readonly autuService : AuthService){}

    @Post('/user_auth')
    userAuth(@Body() body :JSON){
        return this.autuService.userAuth(body);
    }
}
