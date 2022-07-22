import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UseGuards,
  Req,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { Response } from 'express';
import { LocaGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IOTP, UserLogin } from 'src/auth/Models/user-login.interface';
import { MyRole } from 'src/role/role.enum';
import { Roles } from 'src/role/roles.decorator';
import { RolesGuard } from 'src/role/roles.guard';
import { BithAndName } from '../Models/bith-name.interface';
import IUser, { UserResponse } from '../Models/post.interface';
import { UserService } from '../Services/user.service';
import { authenticator } from 'otplib';
import { TwoFactorAuthenticationService } from 'src/otplib/twoFactorAuthentication.service';
import QRCode, { toDataURL } from 'qrcode';

@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private otbLibrary: TwoFactorAuthenticationService,
  ) {}
  API_KEY_SECRET = '6Lfq0QkhAAAAAHlczNYk72buqznp6ASys1LQqayc';
  secret = 'XDQXYCP5AC6FA32FQXDGJSPBIZODINET';
  @Post()
  async create(@Body() post: IUser) {
    return await this.userService.create(post);
  }
  @ApiBearerAuth('acess_token')
  @UseGuards(JwtAuthGuard)
  @Get('/:uuid')
  async findOne(@Param('uuid') uuid: string, @Res() res) {
    try {
      const data = await this.userService.findOne(uuid);
      res.status(HttpStatus.FOUND).json({
        message: 'success',
        data,
      });
    } catch (err: unknown) {
      throw new NotFoundException('User Not Found');
    }
  }
  @Delete(':uuid')
  async removeUser(@Param('uuid') uuid: string, @Res() res: Response) {
    try {
      await this.userService.removeUser(uuid);
      res.status(HttpStatus.FOUND).json({
        message: 'success',
      });
    } catch (err: unknown) {
      throw new UnauthorizedException('User Not Found');
    }
  }
  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() userPost: BithAndName,
  ): Promise<UserResponse> {
    return await this.userService.updateUser(uuid, userPost);
  }
  @ApiBearerAuth('acess_token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(MyRole.Admin)
  @Get()
  async getAll(@Req() req: any): Promise<UserResponse[]> {
    return await this.userService.findAll();
  }
  @Post('check-opt')
  async checkOTPUser(@Req() req) {
    const { data, userLogin } = req.body;
    const checkOTP = this.otbLibrary.checkOTB(data);
    if (checkOTP) {
      return await this.authService.signIn(userLogin);
    }
    throw new BadRequestException('OTP Not Alive');
  }
  @Post('sign-in')
  async signIn(@Body() { userLogin, token }) {
    if (token) {
      const score = await this.authService.checkCapcha(
        token,
        this.API_KEY_SECRET,
      );
      if (+score < 0.6) {
        throw new UnauthorizedException('You Are Robot');
      }
      try {
        const userFound = await this.userService.findEmailUser(userLogin);
        if (userFound) {
          return this.otbLibrary.generateTwoFactorAuthenticationSecret(
            userLogin.emailUser,
          );
        }
      } catch (err) {
        throw err;
      }
    }
  }

  @Put('change/password')
  async changePassword(@Body() userPassword) {
    return await this.userService.changePassUser(userPassword);
  }
}
