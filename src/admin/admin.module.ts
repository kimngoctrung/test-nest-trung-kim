import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { AdminService } from './admin.service';

@Module({
  imports: [UserModule],
  providers: [AdminService, JwtStrategy],
  exports: [AdminModule],
})
export class AdminModule {}
