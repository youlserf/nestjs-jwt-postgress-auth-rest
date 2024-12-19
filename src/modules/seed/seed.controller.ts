import { Controller, Post } from '@nestjs/common';
import { UserRoleEnum } from 'src/enums/UserRoleEnum';
import { AuthService } from '../auth/auth.service';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post()
  async seedData() {
    await this.authService.register('admin@apuestatotal.com', 'admin123', UserRoleEnum.ADMIN);
    await this.authService.register('user1@apuestatotal.com', 'user123', UserRoleEnum.USER);
    return { message: 'Seed data inserted successfully' };
  }
}
