import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
    constructor(private readonly userService : UserService){}
    
    //조회
    @Get("/get_user")
    getUser(){
       return this.userService.getUser();
    }

    //생성
    @Post("/register_user")
    createUser(){
        return this.userService.createUser();
    }

    //제거
    @Delete("/deluser")
    deleteUser(){
        return this.userService.deleteUser();
    }

    //수정
    @Patch("/patch_user")
    patchUser(){
        return this.userService.patchUser();
    }
}
