import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Good } from './goods.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { RoleAuthGuard } from 'src/auth/role-auth.guard';
import { CreateGoodDto } from './dto/create-good.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @ApiOperation({ summary: 'Get all goods list' })
  @ApiResponse({ status: 200, type: [Good] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.goodsService.getAllGoods();
  }

  @ApiOperation({ summary: 'create good' })
  @ApiResponse({ status: 200, type: Good })
  @Roles('MODERATOR', 'ADMIN')
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() dto: CreateGoodDto, @UploadedFile() image) {
    return this.goodsService.createGood(dto, image);
  }
}
