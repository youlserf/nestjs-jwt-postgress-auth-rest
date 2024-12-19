import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRoleEnum } from 'src/enums/UserRoleEnum';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string, role: UserRoleEnum): Promise<User> {
    const user = this.userRepository.create({ email, password, role });
    return this.userRepository.save(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
}
