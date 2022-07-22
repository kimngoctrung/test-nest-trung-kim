import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLogin } from './Models/user-login.interface';
import IUser from 'src/user/Models/post.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userLogin: UserLogin): Promise<IUser> {
    const user = await this.authService.validateUser(userLogin);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
