import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMainPage(body : JSON){
    console.log(body);
    return "This will output main page";
  }
}
