import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/category/category.model';
import { User } from 'src/users/users.model';

interface GoodCreationAttrs {
  title: string;
  descr: string;
  categoryId: number;
  image: string;
}

@Table({ tableName: 'goods' })
export class Good extends Model<Good, GoodCreationAttrs> {
  @ApiProperty({ example: '1', description: 'id of good' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'TITLE', description: 'title of good' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({ example: '123123131wfwfwwe', description: 'text of good' })
  @Column({ type: DataType.STRING, allowNull: false })
  descr: string;

  @ApiProperty({ example: '231.jpg', description: 'link to image of post' })
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  @ApiProperty({
    description: 'advantages',
    type: [String],
  })
  advantages: string[];

  @ApiProperty({ example: '1', description: 'id of category' })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Category)
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
