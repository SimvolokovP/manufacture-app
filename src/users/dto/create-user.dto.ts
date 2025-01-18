import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: '7845621', description: 'tg id of user' })
  readonly tg_id: number;
}
