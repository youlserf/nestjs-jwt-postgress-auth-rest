import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from 'src/enums/UserRoleEnum';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { sub: user.id, role: user.role };
      return { access_token: this.jwtService.sign(payload) };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async register(email: string, password: string, role: UserRoleEnum = UserRoleEnum.USER) {
    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.createUser(email, hashedPassword, role);

    const payload = { sub: newUser.id, role: newUser.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
