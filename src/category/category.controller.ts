import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleAuthGuard } from 'src/auth/role-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  @ApiOperation({ summary: 'Update category by ID' })  
  @ApiResponse({ status: 200, type: Category })
  @Roles('MODERATOR', 'ADMIN')  
  @UseGuards(JwtAuthGuard, RoleAuthGuard)  
  @Put(':id')  
  update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {  
    return this.categoryService.updateCategory(id, dto);  
  }  

  @ApiOperation({ summary: 'delete category by ID' })  
  @ApiResponse({ status: 200, type: Category })
  @Roles('MODERATOR', 'ADMIN')  
  @UseGuards(JwtAuthGuard, RoleAuthGuard)  
  @Delete(':id')  
  delete(@Param('id') id: number) {  
    return this.categoryService.deleteCategory(id);  
  }  
}
