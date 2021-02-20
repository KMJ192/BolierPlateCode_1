import { Body, Controller, Delete, Get, Patch, Post, Res, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { UserGuard } from './user.guard';

@Controller('/user')
export class UserController {
    constructor(private readonly userService : UserService){}
    
    //로그인
    @Post("/login")
    Login(
        @Body('email') email : string, 
        @Body('password') password: string, 
        @Res({passthrough : true}) response : Response
    ){
        return this.userService.Login(email, password, response);;
    }

    //Guard => 토큰을 확인하여 토큰이 없을경우(로그인을 하지않았거나, 토큰이 만료되었을 경우 접근을 제한한다.)
    @UseGuards(UserGuard)
    @Get("/email=:email")
    ConfirmUser(@Req() request : Request){        
        return this.userService.ConfirmUser(request);
    }

    //쿠키 삭제 -> logout
    @UseGuards(UserGuard)
    @Post('/logout')
    logout(@Res({passthrough : true}) response : Response){
        return this.userService.Logout(response);
    }

    //회원가입
    @Post("/register_user")
    createUser(@Body() body : JSON){
        return this.userService.RegisteUser(body);
    }

    //회원삭제
    @Delete("/delete_user")
    deleteUser(@Body() body : JSON){
        return this.userService.DeleteUser(body);
    }

    //수정
    @Patch("/patch_user")
    patchUser(@Body() body : JSON){
        return this.userService.PatchUser(body);
    }

    //테스트
    @Get("/test")
    dbTest(@Body() body : JSON){
        return this.userService.dbTest(body);
    }
}
