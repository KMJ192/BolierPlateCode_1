import { Body, Controller, Delete, Get, Patch, Post, Res, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { UserGuard } from './user.guard';

@Controller()
export class UserController {
    constructor(private readonly userService : UserService){}
    
    //Login
    @Post("/login")
    Login(
        @Body('email') email : string, 
        @Body('password') password: string, 
        @Res({passthrough : true}) response : Response
    ){
        return this.userService.Login(email, password, response);
    }

    //Logout
    //Guard => 토큰을 확인하여 토큰이 없을경우(로그인을 하지않았거나, 토큰이 만료되었을 경우 접근을 제한한다.)
    @UseGuards(UserGuard)
    @Post("/logout")
    logout(@Res({passthrough : true}) response : Response){
        return this.userService.Logout(response);
    }

    //@UseGuards(UserGuard)
    @Get("/user")
    ConfirmUser(@Req() request : Request){        
        return this.userService.ConfirmUser(request);
    }

    //User SignUp
    @Post("/register_user")
    createUser(@Body() body : JSON){
        return this.userService.RegisterUser(body);
    }

    //User delete
    @UseGuards(UserGuard)
    @Delete("/delete_user")
    deleteUser(@Body() body : JSON){
        return this.userService.DeleteUser(body);
    }

    //User patch
    @UseGuards(UserGuard)
    @Patch("/patch_user")
    patchUser(@Body() body : JSON){
        return this.userService.PatchUser(body);
    }

}
