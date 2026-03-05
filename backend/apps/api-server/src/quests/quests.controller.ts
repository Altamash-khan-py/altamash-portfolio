import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { QuestDto, CreateQuestRequest, UpdateQuestRequest } from '@portfolio/types';

class CreateQuestDto implements CreateQuestRequest {
  title: string;
  description: string;
  status?: 'IDEA' | 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  tags?: string[];
  startDate?: string;
  targetDate?: string;
  order?: number;
}

class UpdateQuestDto implements UpdateQuestRequest {
  title?: string;
  description?: string;
  status?: 'IDEA' | 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  tags?: string[];
  startDate?: string;
  targetDate?: string;
  order?: number;
}

@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Get()
  async getQuests(): Promise<QuestDto[]> {
    return this.questsService.getQuests();
  }

  @Get(':id')
  async getQuestById(@Param('id') id: string): Promise<QuestDto> {
    return this.questsService.getQuestById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createQuest(@Body() data: CreateQuestDto): Promise<QuestDto> {
    return this.questsService.createQuest(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateQuest(@Param('id') id: string, @Body() data: UpdateQuestDto): Promise<QuestDto> {
    return this.questsService.updateQuest(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteQuest(@Param('id') id: string): Promise<void> {
    return this.questsService.deleteQuest(id);
  }
}
