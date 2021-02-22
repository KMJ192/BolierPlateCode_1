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
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    Login(email, password, response) {
        return this.userService.Login(email, password, response);
    }
    logout(response) {
        return this.userService.Logout(response);
    }
    ConfirmUser(request) {
        return this.userService.ConfirmUser(request);
    }
    createUser(body) {
        return this.userService.RegisterUser(body);
    }
    deleteUser(body) {
        return this.userService.DeleteUser(body);
    }
    patchUser(body) {
        return this.userService.PatchUser(body);
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
], UserController.prototype, "Login", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Post("/logout"),
    __param(0, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Get("/email=:email"),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "ConfirmUser", null);
__decorate([
    common_1.Post("/register_user"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Delete("/delete_user"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Patch("/patch_user"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "patchUser", null);
UserController = __decorate([
    common_1.Controller('/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map