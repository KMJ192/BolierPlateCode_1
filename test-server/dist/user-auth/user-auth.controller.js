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
exports.UserAuthController = void 0;
const common_1 = require("@nestjs/common");
const user_auth_service_1 = require("./user-auth.service");
const user_auth_guard_1 = require("./user-auth.guard");
let UserAuthController = class UserAuthController {
    constructor(userAuthService) {
        this.userAuthService = userAuthService;
    }
    RegisterUser(body) {
        return this.userAuthService.RegisterUser(body);
    }
    Login(email, password, response) {
        return this.userAuthService.Login(email, password, response);
    }
    ConfirmUser(request) {
        return this.userAuthService.ConfirmUser(request);
    }
    deleteUser(body) {
        return this.userAuthService.DeleteUser(body);
    }
    patchUser(body) {
        return this.userAuthService.PatchUser(body);
    }
};
__decorate([
    common_1.Post("/register_user"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "RegisterUser", null);
__decorate([
    common_1.Post("/login"),
    __param(0, common_1.Body("email")),
    __param(1, common_1.Body("password")),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "Login", null);
__decorate([
    common_1.Get("/user"),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "ConfirmUser", null);
__decorate([
    common_1.UseGuards(user_auth_guard_1.UserAuthGuard),
    common_1.Delete("/delete_user"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "deleteUser", null);
__decorate([
    common_1.UseGuards(user_auth_guard_1.UserAuthGuard),
    common_1.Patch("/patch_user"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "patchUser", null);
UserAuthController = __decorate([
    common_1.Controller("/user-auth"),
    __metadata("design:paramtypes", [user_auth_service_1.UserAuthService])
], UserAuthController);
exports.UserAuthController = UserAuthController;
//# sourceMappingURL=user-auth.controller.js.map