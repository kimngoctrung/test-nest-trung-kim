import { BadRequestException, Req, Res } from '@nestjs/common';
import { authenticator, totp } from 'otplib';
import { UserLogin } from 'src/auth/Models/user-login.interface';
import { toDataURL } from 'qrcode';

export class TwoFactorAuthenticationService {
  secret = 'dsakdhskaldjskladjsklada';
  async generateTwoFactorAuthenticationSecret(userLogin: UserLogin) {
    const otpauthUrl = authenticator.keyuri(
      userLogin.emailUser,
      'TWO_FACTOR_AUTHENTICATION_APP_NAME',
      this.secret,
    );
    const qr = await toDataURL(otpauthUrl);
    return qr;
  }
  checkOTB(otp) {
    const isValid = authenticator.check(otp, this.secret);
    if (!isValid) {
      return false;
    }
    return true;
  }
}
