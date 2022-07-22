import { Injectable } from '@nestjs/common';
import { UserLogin } from 'src/auth/Models/user-login.interface';
import IUser from 'src/user/Models/post.interface';
import { UserService } from 'src/user/Services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PassHashService {
  constructor(private userService: UserService) {}
  async passHashService(
    userLogin: UserLogin,
    userFound: IUser,
  ): Promise<boolean> {
    const match = await bcrypt.compare(userLogin.password, userFound.password);
    if (match) {
      return true;
    }
    return false;
  }
}
