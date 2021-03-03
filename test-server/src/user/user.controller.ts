import { Body, Controller, Delete, Get, Patch, Post, Res, Req, UseGuards, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { UserGuard } from './user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller()
export class UserController {
    constructor(private readonly userService : UserService){}
    
    //Login
    @Post("/login")
    login(
        @Body('email') email : string, 
        @Body('password') password: string, 
        @Res({passthrough : true}) response : Response
    ){
        return this.userService.Login(email, password, response);
    }

    @Get("/uimg/:path")
    getUserImage(@Param("path") path, @Res() response : Response){
        response.sendFile(path, {
            root: "user_image"
        });
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
    confirmUser(@Req() request : Request){
        return this.userService.ConfirmUser(request);
    }

    //User SignUp
    @Post("/register_user")
    @UseInterceptors(FileInterceptor("user_image", {
        storage: diskStorage({
            destination: "./user_image",
            filename(_, file, callback){
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return callback(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    createUser(@Body() body : JSON, @UploadedFile() file : Express.Multer.File){
        console.log(file.path);
        return this.userService.RegisterUser(body, file.path);
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

    //test
    @Post('/file_test')
    @UseInterceptors(FileInterceptor("user_image", {
        storage: diskStorage({
            destination: "./user_image",
            filename(_, file, callback){
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return callback(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    fileTest(@UploadedFile() file : Express.Multer.File){
        return {
            url : `http://localhost:8080/api/${file.path}`
        };
    }
}