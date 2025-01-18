import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { where } from 'sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async getAllCategories() {
    const categoriesList = await this.categoryRepository.findAll();
    return categoriesList;
  }

  async createCategory(dto: CreateCategoryDto) {
    const createdCategory = await this.categoryRepository.create(dto);

    return createdCategory;
  }
  
  async getCategoryById(id: number) {
    try {
      const targetCategory = await this.categoryRepository.findByPk(id);

      if (!targetCategory) {
        throw new Error(`Category with ID ${id} not found`);
      }
      return targetCategory;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve category');
    }
  }
}
