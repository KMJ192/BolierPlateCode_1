"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PWEncryption = void 0;
const bcrypt = require('bcrypt');
const saltRounds = 10;
function PWEncryption(pw) {
    let encrypted;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            return {
                createUserSuccess: false,
                message: err
            };
        }
        bcrypt.hash(pw, salt, function (err, hash) {
            if (err) {
                return {
                    createUserSuccess: false,
                    message: err
                };
            }
            encrypted = String(hash);
            console.log(encrypted);
        });
    });
    return encrypted;
}
exports.PWEncryption = PWEncryption;
//# sourceMappingURL=password_encryption.js.map