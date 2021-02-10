import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMainPage(){
    return "This will output main page";
  }
}
