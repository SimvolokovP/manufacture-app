import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleAuthGuard } from 'src/auth/role-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users list' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Creating User' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Update user role' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put('role/:id')
  updateUserRole(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateUserRole(id, updateRoleDto);
  }
}
