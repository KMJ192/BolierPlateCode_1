import { Body, Controller, Get, Post, Res, Req, UseGuards, Delete, Patch } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { Response, Request } from 'express';
import { UserAuthGuard } from './user-auth.guard';

@Controller("/user-auth")
export class UserAuthController {
    constructor(private readonly userAuthService : UserAuthService){}

    //유저등록
    @Post("/register_user")
    RegisterUser(@Body() body : JSON){
        return this.userAuthService.RegisterUser(body);
    }

    //로그인
    @Post("/login")
    Login(
        @Body("email") email : string,
        @Body("password") password : string,
        @Res({passthrough : true}) response : Response
    ){
        return this.userAuthService.Login(email, password, response);
    }

    //유저 확인
    @Get("/user")
    ConfirmUser(@Req() request : Request){
        return this.userAuthService.ConfirmUser(request);
    }

    //유저 삭제
    @UseGuards(UserAuthGuard)
    @Delete("/delete_user")
    deleteUser(@Body() body : JSON){
        return this.userAuthService.DeleteUser(body);
    }

    //유저정보수정
    @UseGuards(UserAuthGuard)
    @Patch("/patch_user")
    patchUser(@Body() body : JSON){
        return this.userAuthService.PatchUser(body);
    }

}
