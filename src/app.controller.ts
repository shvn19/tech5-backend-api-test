import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailerService,
    ) {}

  @Get('/merge/:select')
  getHello(@Param('select') select: string, @Body() data: object): string {
    // return this.appService.getHello();
    // console.log('vao duoc controller');
    const t: any = this.appService.getDoc(select, data);
    return 'done';
  }

  @Get('/plain-text-email')
  async plainTextEmail(@Query('toEmail') toEmail: string) {
    console.log('start')
    console.log('toEmail', toEmail)
  var response = await this.mailService.sendMail({
   to:toEmail,
   from:"lequangminh10081990@gmail.com",
   subject: 'Plain Text Email ✔',
   text: 'Welcome NestJS Email Sending Tutorial', 
  });
  console.log('response', response)
  return response;
}

@Get('/file-attachment')
async fileAttachement(@Query('toEmail') toEmail){
  var response = await this.mailService.sendMail({
    to: toEmail,
    from: 'lequangminh10081990@gmail.com',
    subject: 'File Attachment',
    html: "<h1>File Attachment</h1>",
    attachments:[{
      path:    join(__dirname,'../src/mails/to-khai-cap-giay-xac-nhan-tinh-trang-hon-nhan.docx'),
      filename:'result.docx',
      contentDisposition:"attachment"
    }]
  });
  return 'success';
}

  // @Get("/doc")
  // getDoc(): string {
  //   console.log('vao duoc controller');
  //   return this.appService.getDoc();
  // }
}
