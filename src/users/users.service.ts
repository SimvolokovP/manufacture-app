import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

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

  async updateUserRole(id: number, updateRoleDto: UpdateUserRoleDto) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.role = updateRoleDto.role;
    return user.save();
  }
}
