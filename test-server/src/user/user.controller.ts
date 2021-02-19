import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { VirtualTimeScheduler } from 'rxjs';
import { UserService } from './user.service';

const bcrypt = require("bcrypt");

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
    patchUser(@Body() body : JSON){
        return this.userService.patchUser(body);
    }

    //테스트
    @Get("/test")
    dbTest(@Body() body : JSON){
        return this.userService.dbTest(body);
    }
}
