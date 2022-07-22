import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import IUser from 'src/user/Models/post.interface';
import { UserService } from 'src/user/Services/user.service';

@Injectable()
export class AdminService {
  constructor(private userService: UserService) {}
  async blockUser(uuid: string) {
    const userFound = await this.userService.findOne(uuid);
    const newUserBlock = { ...userFound, isActive: false };
    return newUserBlock;
  }
  async unBlockUser(uuid: string) {
    const userFound = await this.userService.findOne(uuid);
    const newUserBlock = { ...userFound, isActive: true };
    return newUserBlock;
  }
}
