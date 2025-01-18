import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Good } from 'src/goods/goods.model';

interface CategoryCreationAttrs {
  value: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @ApiProperty({ example: '1', description: 'id of category' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Зерносушка', description: 'value of category' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  value: string;

  @HasMany(() => Good)
  goods: Good[];
}
