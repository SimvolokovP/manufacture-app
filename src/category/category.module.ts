import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category.model';
import { AuthModule } from 'src/auth/auth.module';
import { Good } from 'src/goods/goods.model';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [
    SequelizeModule.forFeature([Category, Good]),
    forwardRef(() => AuthModule),
  ],
  exports: [CategoryModule],
})
export class CategoryModule {}
