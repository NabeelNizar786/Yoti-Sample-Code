import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(): String {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): String {
    return 'This Action Return All Cats';
  }

  @Get(':id')
  findOne(@Param() params: any): String {
    console.log(params.id);
    return `this action returns a #${params.id} cat`;
  }
}
