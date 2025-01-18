import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getAllUsers() {
    const usersList = await this.userRepository.findAll({
      include: { all: true },
    });
    return usersList;
  }

  async createUser(dto: CreateUserDto) {
    const userData = { ...dto, role: 'USER' };
    const user = await this.userRepository.create(userData);
    return user;
  }

  async getUserByTelegramId(tg_id: number) {
    const targetUser = await this.userRepository.findOne({
      where: { tg_id },
      include: { all: true },
    });
    return targetUser;
  }
}
