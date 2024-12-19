import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SeedController } from './seed.controller';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [SeedController],
})
export class SeedModule {}
