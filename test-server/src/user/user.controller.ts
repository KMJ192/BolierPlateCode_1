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

    private filepath = "file-repo/user_image"

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
        //저장되어있는 파일 경로 response
        response.sendFile(path, {
            root: this.filepath
        });
    }

    //Logout
    //Guard => 토큰을 확인하여 토큰이 없을경우(로그인을 하지않았거나, 토큰이 만료되었을 경우 접근을 제한한다.)
    @UseGuards(UserGuard)
    @Post("/logout")
    logout(@Res({passthrough : true}) response : Response){
        return this.userService.Logout(response);
    }

    @Get("/user")
    confirmUser(@Req() request : Request){
        return this.userService.ConfirmUser(request);
    }

    //User SignUp
    @Post("/register_user")
    @UseInterceptors(FileInterceptor("user_image", {
        storage: diskStorage({
            destination: "./file-repo/user_image",
            filename(_, file, callback){
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return callback(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    createUser(@UploadedFile() file : Express.Multer.File, @Body() body : JSON){
        if(file){
            return this.userService.RegisterUser(body, file.filename);
        }else{
            return this.userService.RegisterUser(body, "");
        }
    }

    //User delete
    @UseGuards(UserGuard)
    @Delete("/delete_user/:data")
    deleteUser(@Param() data : JSON, @Res({passthrough : true}) response : Response){
        return this.userService.DeleteUser(data["data"], response);
    }

    //User patch
    @UseGuards(UserGuard)
    @Patch("/patch_user")
    @UseInterceptors(FileInterceptor("user_image", {
        storage: diskStorage({
            destination: "./file-repo/user_image",
            filename(_, file, callback){
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return callback(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    patchUser(@UploadedFile() file : Express.Multer.File, @Body() body : JSON){
        //대표이미지 수정유무 확인하여 Param넘겨줌
        if(!file){
            return this.userService.PatchUser(body, "");
        }else{
            return this.userService.PatchUser(body, file.filename);
        }
    }

    @Post("/email_confirm")
    emailConfirm(@Body('email') email : string){
        return this.userService.EmailConfirm(email);
    }

    @Post("/nickname_confirm")
    nicknameConfirm(@Body('nickname') nickname : string){
        return this.userService.NicknameConfirm(nickname);
    }
}