import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { TimelineEventDto, CreateTimelineEventRequest, UpdateTimelineEventRequest } from '@portfolio/types';
import { TimelineType } from '@portfolio/database';

class CreateTimelineEventDto implements CreateTimelineEventRequest {
  title: string;
  description: string;
  date: string;
  type: 'PERSONAL' | 'EDUCATION' | 'CAREER' | 'PROJECT' | 'SKILL' | 'MILESTONE';
  icon?: string;
  color?: string;
  linkUrl?: string;
  linkText?: string;
  order?: number;
}

class UpdateTimelineEventDto implements UpdateTimelineEventRequest {
  title?: string;
  description?: string;
  date?: string;
  type?: 'PERSONAL' | 'EDUCATION' | 'CAREER' | 'PROJECT' | 'SKILL' | 'MILESTONE';
  icon?: string;
  color?: string;
  linkUrl?: string;
  linkText?: string;
  order?: number;
}

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  async getTimeline(@Query('type') type?: TimelineType): Promise<TimelineEventDto[]> {
    if (type) {
      return this.timelineService.getTimelineByType(type);
    }
    return this.timelineService.getTimeline();
  }

  @Get(':id')
  async getTimelineEventById(@Param('id') id: string): Promise<TimelineEventDto> {
    return this.timelineService.getTimelineEventById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createTimelineEvent(@Body() data: CreateTimelineEventDto): Promise<TimelineEventDto> {
    return this.timelineService.createTimelineEvent(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateTimelineEvent(@Param('id') id: string, @Body() data: UpdateTimelineEventDto): Promise<TimelineEventDto> {
    return this.timelineService.updateTimelineEvent(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteTimelineEvent(@Param('id') id: string): Promise<void> {
    return this.timelineService.deleteTimelineEvent(id);
  }
}
