import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, role: user.role, tg_id: user.tg_id };
    const token = this.jwtService.sign(payload);
    console.log(token);
    return {
      token,
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByTelegramId(userDto.tg_id);
    if (user) {
      return user;
    } else {
      const createdUser = await this.userService.createUser(userDto);
      return createdUser;
    }
  }
}
