import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  tg_id: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'id of user' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '7206321', description: 'tg id of user' })
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  tg_id: number;

  @ApiProperty({ example: 'ADMIN', description: 'user role' })
  @Column({ type: DataType.STRING, allowNull: false, })
  role: string;
}
