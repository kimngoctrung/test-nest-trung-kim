import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BithAndName {
  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  bthday: string;
}
