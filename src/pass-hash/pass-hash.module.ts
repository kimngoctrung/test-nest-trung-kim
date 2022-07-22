import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PassHashService } from './pass-hash.service';

@Module({
  imports: [UserModule],
  providers: [PassHashService],
  exports: [PassHashService],
})
export class PassHashModule {}
