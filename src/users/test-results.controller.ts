import { Controller, Post, Get, Body, UseGuards, Request, Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TestResultsService } from './test-results.service';

@Controller('test-results')
@UseGuards(AuthGuard('jwt'))
export class TestResultsController {
  constructor(private testResultsService: TestResultsService) {}

  @Post()
  async createTestResult(@Request() req, @Body() testData: {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    passed: boolean;
    questions: any[];
    selectedAnswers: any;
    correctAnswersList: any[];
  }) {
    const userId = req.user.userId;
    return this.testResultsService.create(userId, testData);
  }

  @Get()
  async getUserTestResults(@Request() req) {
    const userId = req.user.userId;
    return this.testResultsService.findByUserId(userId);
  }

  @Get(':id')
  async getTestResultById(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.userId;
    return this.testResultsService.findById(id, userId);
  }

  @Get('stats')
  async getUserStats(@Request() req) {
    const userId = req.user.userId;
    return this.testResultsService.getStats(userId);
  }
} 