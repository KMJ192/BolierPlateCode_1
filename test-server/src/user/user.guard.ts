import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService : JwtService){}
  
  //토큰을 이용하여 접근제한여부 판단
  canActivate(context: ExecutionContext){
    const request = context.switchToHttp().getRequest();
    const jwt = request.cookies['jwt'];
    try{
      return this.jwtService.verify(jwt);
    }catch(e){
      return false;
    }
  }
}
