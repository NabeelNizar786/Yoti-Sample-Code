import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('yoti')
  async getRes() {
    try {
      const result = await this.appService.getResponse();
      return result;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to generate');
    }
  }
}
