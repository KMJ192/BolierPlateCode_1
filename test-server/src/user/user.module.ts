import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constance'


@Module({
  imports : [
      JwtModule.register({
      secret : jwtConstants.secret,
      signOptions : {expiresIn : "1h"}
    })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
