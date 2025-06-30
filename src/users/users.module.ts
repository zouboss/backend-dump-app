import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { TestResult } from './test-result.entity';
import { TestResultsService } from './test-results.service';
import { TestResultsController } from './test-results.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, TestResult])
  ],
  providers: [UsersService, TestResultsService],
  controllers: [UsersController, TestResultsController],
  exports: [UsersService, TestResultsService, TypeOrmModule],
})
export class UsersModule {}
