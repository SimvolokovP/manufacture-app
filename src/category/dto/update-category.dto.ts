import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Зерносушилка', description: 'value of category' })
  readonly value: string;
}
