import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userentities } from '../Models/post.entity';
import IUser, { UserResponse } from '../Models/post.interface';
import * as bcrypt from 'bcrypt';
import { UserLogin } from 'src/auth/Models/user-login.interface';
import { BithAndName } from '../Models/bith-name.interface';
import ChangePassWord from 'src/auth/Models/change-pass.interface';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { MyRole } from 'src/role/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Userentities)
    private readonly userPostRespository: Repository<Userentities>,
    @InjectMapper()
    private mapper: Mapper,
  ) {}
  salt = 9;
  async create(userPost: IUser): Promise<UserResponse> {
    try {
      const userFound = await this.userPostRespository.findOne({
        where: { emailUser: userPost.emailUser },
      });
      if (userFound !== undefined) {
        throw new ConflictException('User Existed');
      }
      const hash = bcrypt.hashSync(userPost.password, this.salt);
      const userHash = { ...userPost, password: hash };
      userPost.role = MyRole.User;
      const userCreate = await this.userPostRespository.save(userHash);
      return this.mapper.map(userCreate, Userentities, UserResponse);
    } catch (err: unknown) {
      throw err as string;
    }
  }
  async findOne(uuid: string): Promise<UserResponse> {
    const userFound = await this.userPostRespository.findOne({ uuid });
    if (userFound) {
      return this.mapper.map(userFound, Userentities, UserResponse);
    }
  }
  async removeUser(uuid: string): Promise<boolean> {
    const userFound = await this.userPostRespository.delete(uuid);
    if (userFound) {
      return true;
    }
    return false;
  }
  async updateUser(
    uuid: string,
    userPost: BithAndName,
  ): Promise<UserResponse | any> {
    try {
      const userFound = await this.userPostRespository.findOne({ uuid });
      if (userFound) {
        const userUdate = await this.userPostRespository.save({ ...userPost });
        const userRes = this.mapper.map(userUdate, Userentities, UserResponse);
        return userRes;
      }
      throw new NotFoundException('User Not Found');
    } catch (err: unknown) {
      // throw err as string;
      throw err as string;
    }
  }
  async findAll(): Promise<UserResponse[]> {
    const listUser = await this.userPostRespository.find();
    const userRes = this.mapper.mapArray(listUser, Userentities, UserResponse);
    return userRes;
  }
  async findEmailUser({ emailUser }: UserLogin): Promise<IUser> {
    const userFound = await this.userPostRespository.findOne({
      where: { emailUser: emailUser },
    });

    if (!userFound) {
      throw new NotFoundException('User Not Found');
    }
    return userFound;
  }
  async changePassUser(userPassword: ChangePassWord): Promise<UserResponse> {
    const { emailUser, password } = userPassword;
    const userLogin: UserLogin = { ...{}, emailUser, password };
    const userFound = await this.findEmailUser(userLogin);
    if (userFound) {
      const match = await bcrypt.compare(
        userPassword.password,
        userFound.password,
      );
      if (match) {
        if (userPassword.newPassword === userPassword.reNewPassword) {
          const hash = bcrypt.hashSync(userPassword.newPassword, this.salt);
          const userUpdate = await this.userPostRespository.save({
            ...userFound,
            password: hash,
          });

          const userRes = this.mapper.map(
            userUpdate,
            Userentities,
            UserResponse,
          );
          return userRes;
        }
        throw new UnauthorizedException(
          'New Password Is Not Corectt Confirm New Password',
        );
      }
      throw new UnauthorizedException('Passwork Invalid');
    }
    throw new UnauthorizedException('User Not Found');
  }
}
