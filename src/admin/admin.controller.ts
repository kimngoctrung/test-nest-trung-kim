import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { MyRole } from 'src/role/role.enum';
import { Roles } from 'src/role/roles.decorator';
import { RolesGuard } from 'src/role/roles.guard';
import { UserResponse } from 'src/user/Models/post.interface';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('/block/:uuid')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(MyRole.Admin)
  async blockUser(@Param('uuid') uuid: string) {
    try {
      const data = await this.adminService.blockUser(uuid);
      return data;
    } catch (err: unknown) {
      throw new NotFoundException('User Not Found');
    }
  }
  @Get('/un-block/:uuid')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(MyRole.Admin)
  async unBlockUser(@Param('uuid') uuid: string) {
    try {
      const data = await this.adminService.unBlockUser(uuid);
      return data;
    } catch (err: unknown) {
      throw new NotFoundException('User Not Found');
    }
  }
}
