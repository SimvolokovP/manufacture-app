import { Injectable } from '@nestjs/common';
import { Good } from './goods.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateGoodDto } from './dto/create-good.dto';

@Injectable()
export class GoodsService {
  constructor(
    @InjectModel(Good) private goodRepository: typeof Good,
    private filesService: FilesService,
  ) {}

  async getAllGoods() {
    const goods = await this.goodRepository.findAll({
      include: { all: true },
    });
    return goods;
  }

  async createGood(dto: CreateGoodDto, image) {
    const fileName = await this.filesService.createFile(image);
    const good = await this.goodRepository.create({ ...dto, image: fileName });
    return good;
  }
}
