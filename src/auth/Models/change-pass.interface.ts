import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserLogin } from './user-login.interface';

export default class ChangePassWord extends UserLogin {
  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;
  @ApiProperty()
  @IsNotEmpty()
  reNewPassword: string;
}
