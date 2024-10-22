import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class BreedsController {
    @Get('breed')
    findAll(@Req() request:Request): String {
        return 'this return breed'
    }
}
