import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class AppService {
  constructor(
    private readonly mailService: MailerService,
    ) {}
  getHello(): string {
    return 'Hello World!'
  }

  async getDoc(select: string, data: object) {
    const data1 = {
      ubndxa: "UBND xa BCD",
      hoten_nguoiyeucau: "Hà Nguyễn",
      noicutru_nguoiyeucau: "69 96 Street, Hồ Chí Minh City, VIệt Nam",
      cmnd_nguoiyeucau: "123456789",
      quanhe: "Cha",
      hoten_nguoiduocyeucau: "Tuấn Đinh",
      birthday: '01/01/2000',
      gioitinh: 'THứ 3',
      dantoc: 'Kinh',
      quoctich: 'Việt Nam',
      noicutru_nguoiduocyeucau: '96 69 Street, Biên Hòa, Đồng Nai',
      cmnd_nguoiduocyeucau: '123456123',
      tinhtranghonnhan: 'Độc thân',
      mucdich: 'Lấy chồng',
      ngay: '09',
      thang: '07',
      nam: '2022',
      toEmail: 'ha.nguyen@teqie.io'
    }
    const data2 = {
      female_name: "Tuấn ĐInh",
      female_birthday: '20/02/2020',
      female_dantoc: 'Kinh',
      female_quoctich: 'Việt Nam',
      female_noicutru: 'Biên Hòa, Đồng Nai',
      female_cmnd: "123456789",
      female_lankethon: '10',
      male_name: "Hà Nguyễn",
      male_birthday: '20/02/2020',
      male_dantoc: 'Kinh',
      male_quoctich: 'Việt Nam',
      male_noicutru: 'Biên Hòa, Đồng Nai',
      male_cmnd: "123456789",
      male_lankethon: '10',
      coquandangki: "UBND xã 69",
      ngaydangki: '09',
      thangdangki: '07',
      namdangki: '2022',
      toEmail: 'tuan.dinh@teqie.io'
    }

    let pathFile
    if(select === '1'){
      data = data1
      pathFile = 'to-khai-cap-giay-xac-nhan-tinh-trang-hon-nhan'
    } else {
      data = data2
      pathFile = 'Mau_TK_dang_ky_ket_hon'
    }
    console.log('in service, getdoc');
    const PizZip = require("pizzip");
    const Docxtemplater = require("docxtemplater");

    const fs = require("fs");
    const path = require("path");

    // Load the docx file as binary content
    const content = fs.readFileSync(
        path.resolve(__dirname, `../public/${pathFile}.docx`),
        "binary"
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render(data);

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });

    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    const date = new Date();
    const id = date.getMilliseconds();
    fs.writeFileSync(path.resolve(__dirname, `../src/mails/${pathFile}-${id}.docx`), buf);
    var response = await this.mailService.sendMail({
      to: data['toEmail'],
      from: 'lequangminh10081990@gmail.com',
      subject: 'File Attachment',
      html: "<h1>File Attachment</h1>",
      attachments:[{
        path:    join(__dirname, `../src/mails/${pathFile}-${id}.docx`),
        filename:'result.docx',
        contentDisposition:"attachment"
      }]
    });
    return;
  }
}
