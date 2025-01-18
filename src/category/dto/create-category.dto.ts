import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Зерносушилка', description: 'value of category' })
  readonly value: string;
}
