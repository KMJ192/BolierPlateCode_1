import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserAuthModule } from './user-auth/user-auth.module';

@Module({
  imports: [UserModule, UserAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
