import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constance';

@Module({
  imports : [
    JwtModule.register({
      secret : jwtConstants.secret,
      signOptions : {expiresIn : "1h"}
    })
  ],
  controllers : [UserAuthController],
  providers: [UserAuthService]
})
export class UserAuthModule {}
