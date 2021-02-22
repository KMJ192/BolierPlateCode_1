import { Injectable, HttpStatus } from '@nestjs/common';
import  {Response, Request } from 'express';

@Injectable()
export class AppService {
  getMainPage(response : Response, request : Request){
    const tData = {
      bo : true,
      message : "ㄹㅇ"
    }
    console.log(response.send(tData));
    //console.log(request);
    return "This will output main page";
  }
}
