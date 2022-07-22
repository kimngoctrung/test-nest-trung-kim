import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import IUser, { UserResponse } from 'src/user/Models/post.interface';
import { UserService } from 'src/user/Services/user.service';
import { UserLogin } from './Models/user-login.interface';
import * as bcrypt from 'bcrypt';
import { PassHashService } from 'src/pass-hash/pass-hash.service';
import axios from 'axios';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Userentities } from 'src/user/Models/post.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passHash: PassHashService,
    @InjectMapper()
    private mapper: Mapper,
  ) {}
  async validateUser(userLogin: UserLogin): Promise<IUser> {
    const userFound = this.userService.findEmailUser(userLogin);
    if (userFound !== null) {
      return userFound;
    }
    throw new UnauthorizedException('User Not Found');
  }
  async signIn(userLogin: UserLogin): Promise<any> {
    const userFound = await this.userService.findEmailUser(userLogin);
    if (userFound) {
      const isLogin = await this.passHash.passHashService(userLogin, userFound);
      if (isLogin) {
        const payload = {
          emailUser: userFound.emailUser,
          sub: userFound.password,
          role: userFound.role,
        };
        const token = this.jwtService.sign(payload);
        const userMap = this.mapper.map(userFound, Userentities, UserResponse);
        const userRes = { ...userMap, token };
        return userRes;
      }
      throw new UnauthorizedException('Password Invalid');
    }
    throw new UnauthorizedException('User Not Found');
  }
  async checkCapcha(token: string, secret: string): Promise<string> {
    try {
      const result = await axios({
        url: `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        method: 'POST',
      });
      return result.data?.score;
    } catch (err: unknown) {
      throw err as string;
    }
  }
}
