import { Module } from '@nestjs/common';
import { UserService } from './Services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userentities } from './Models/post.entity';
import { AuthService } from 'src/auth/auth.service';
import { PassHashService } from 'src/pass-hash/pass-hash.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { UserProfile } from 'src/profile.automapper';
import { RolesGuard } from 'src/role/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AdminService } from 'src/admin/admin.service';
import { TwoFactorAuthenticationService } from 'src/otplib/twoFactorAuthentication.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Userentities]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3000000s' },
    }),
  ],
  providers: [
    UserService,
    AuthService,
    PassHashService,
    UserProfile,
    AdminService,
    TwoFactorAuthenticationService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
