import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // return this.appService.getHello();
    // console.log('vao duoc controller');
    const t: any = this.appService.getDoc();
    return 'done';
  }

  // @Get("/doc")
  // getDoc(): string {
  //   console.log('vao duoc controller');
  //   return this.appService.getDoc();
  // }
}
