import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    userAuth(body){
        return body;
    }
}