import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsAlphanumeric,
  IsEmail,
  IsString,
  Length,
  MinLength,
  MaxLength,
} from 'class-validator';
import { MyRole } from 'src/role/role.enum';
export default class IUser {
  uuid: string;
  @ApiProperty()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 8)
  @IsAlphanumeric()
  userName: string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  emailUser: string;
  @ApiProperty()
  @IsNotEmpty()
  bthday: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  role: MyRole;
  @ApiProperty()
  createdAt: Date;
}
export class UserResponse {
  @AutoMap()
  uuid: string;
  @AutoMap()
  name: string;
  @AutoMap()
  userName: string;
  @AutoMap()
  emailUser: string;
  @AutoMap()
  role: MyRole;
  @AutoMap()
  bthday: string;
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  isActive: boolean;
}
