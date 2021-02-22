import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/test')
  getMainPage(@Res() response : Response, @Req() request : Request){
    return this.appService.getMainPage(response, request);
  }
}
