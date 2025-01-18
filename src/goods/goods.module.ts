import { forwardRef, Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Good } from './goods.model';
import { Category } from 'src/category/category.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  providers: [GoodsService],
  controllers: [GoodsController],
  imports: [SequelizeModule.forFeature([Category, Good]), FilesModule, forwardRef(() => AuthModule)],
})
export class GoodsModule {}
