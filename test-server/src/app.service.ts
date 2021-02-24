import { Injectable, HttpStatus } from '@nestjs/common';
import  {Response, Request } from 'express';

@Injectable()
export class AppService {
  getMainPage(body : JSON){
    console.log(body);
    return "This will output main page";
  }
}
