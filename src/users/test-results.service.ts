import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestResult } from './test-result.entity';

@Injectable()
export class TestResultsService {
  constructor(
    @InjectRepository(TestResult)
    private testResultRepository: Repository<TestResult>,
  ) {}

  async create(userId: number, testData: {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    passed: boolean;
    questions: any[];
    selectedAnswers: any;
    correctAnswersList: any[];
  }): Promise<TestResult> {
    const testResult = this.testResultRepository.create({
      ...testData,
      userId,
    });
    return this.testResultRepository.save(testResult);
  }

  async findById(id: number, userId: number): Promise<TestResult> {
    const testResult = await this.testResultRepository.findOne({
      where: { id, userId },
    });
    
    if (!testResult) {
      throw new NotFoundException('Test result not found');
    }
    
    return testResult;
  }

  async findByUserId(userId: number): Promise<TestResult[]> {
    return this.testResultRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async getStats(userId: number) {
    const results = await this.findByUserId(userId);
    
    if (results.length === 0) {
      return {
        totalTests: 0,
        averageScore: 0,
        bestScore: 0,
        lastTestDate: null,
      };
    }

    const totalTests = results.length;
    const totalScore = results.reduce((sum, test) => sum + test.score, 0);
    const averageScore = Math.round(totalScore / totalTests);
    const bestScore = Math.max(...results.map(test => test.score));
    const lastTestDate = results[results.length - 1].createdAt;

    return {
      totalTests,
      averageScore,
      bestScore,
      lastTestDate,
    };
  }
} 