import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleAuthGuard } from 'src/auth/role-auth.guard';
import { Roles } from 'src/auth/role.decorator';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get all categories list' })
  @ApiResponse({ status: 200, type: [Category] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.categoryService.getAllCategories();
  }

  @ApiOperation({ summary: 'create category' })
  @ApiResponse({ status: 200, type: Category })
  @Roles('MODERATOR', 'ADMIN')
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }
}
