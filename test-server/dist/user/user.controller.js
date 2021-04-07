"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_guard_1 = require("./user.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.filepath = "file-repo/user_image";
    }
    login(email, password, response) {
        return this.userService.Login(email, password, response);
    }
    getUserImage(path, response) {
        response.sendFile(path, {
            root: this.filepath
        });
    }
    logout(response) {
        return this.userService.Logout(response);
    }
    confirmUser(request) {
        return this.userService.ConfirmUser(request);
    }
    createUser(file, body) {
        if (file) {
            return this.userService.RegisterUser(body, file.filename);
        }
        else {
            return this.userService.RegisterUser(body, "");
        }
    }
    deleteUser(data, response) {
        return this.userService.DeleteUser(data["data"], response);
    }
    patchUser(file, body) {
        if (!file) {
            return this.userService.PatchUser(body, "");
        }
        else {
            return this.userService.PatchUser(body, file.filename);
        }
    }
    emailConfirm(email) {
        return this.userService.EmailConfirm(email);
    }
    nicknameConfirm(nickname) {
        return this.userService.NicknameConfirm(nickname);
    }
};
__decorate([
    common_1.Post("/login"),
    __param(0, common_1.Body('email')),
    __param(1, common_1.Body('password')),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    common_1.Get("/uimg/:path"),
    __param(0, common_1.Param("path")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserImage", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Post("/logout"),
    __param(0, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
__decorate([
    common_1.Get("/user"),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "confirmUser", null);
__decorate([
    common_1.Post("/register_user"),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("user_image", {
        storage: multer_1.diskStorage({
            destination: "./file-repo/user_image",
            filename(_, file, callback) {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return callback(null, `${randomName}${path_1.extname(file.originalname)}`);
            }
        })
    })),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Delete("/delete_user/:data"),
    __param(0, common_1.Param()), __param(1, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Patch("/patch_user"),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("user_image", {
        storage: multer_1.diskStorage({
            destination: "./file-repo/user_image",
            filename(_, file, callback) {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return callback(null, `${randomName}${path_1.extname(file.originalname)}`);
            }
        })
    })),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "patchUser", null);
__decorate([
    common_1.Post("/email_confirm"),
    __param(0, common_1.Body('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "emailConfirm", null);
__decorate([
    common_1.Post("/nickname_confirm"),
    __param(0, common_1.Body('nickname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "nicknameConfirm", null);
UserController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map