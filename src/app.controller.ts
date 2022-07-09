import { Body, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:select')
  getHello(@Param('select') select: string, @Body() data: object): string {
    // return this.appService.getHello();
    // console.log('vao duoc controller');
    const t: any = this.appService.getDoc(select, data);
    return 'done';
  }

  // @Get("/doc")
  // getDoc(): string {
  //   console.log('vao duoc controller');
  //   return this.appService.getDoc();
  // }
}
