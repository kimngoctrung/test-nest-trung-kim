import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLogin {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  emailUser: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
export class IOTP {
  @ApiProperty()
  myOTP: string;
}
