import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, passwordHash: string) {
    const existing = await this.repo.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email is already registered');
    }

    return this.repo.save({ email, passwordHash });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  save(user: User) {
    return this.repo.save(user);
  }
}
