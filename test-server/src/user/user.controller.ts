import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
    constructor(private readonly userService : UserService){}
    
    //조회
    @Get("/login")
    getUser(@Body() body : JSON){
       return this.userService.getUser(body);  
    }

    //생성
    @Post("/register_user")
    createUser(@Body() body : JSON){
        return this.userService.createUser(body);
    }

    //제거
    @Delete("/delete_user")
    deleteUser(@Body() body : JSON){
        return this.userService.deleteUser(body);
    }

    //수정
    @Patch("/patch_user")
    patchUser(){
        return this.userService.patchUser();
    }
}
