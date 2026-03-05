import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ExperienceDto, CreateExperienceRequest, UpdateExperienceRequest } from '@portfolio/types';

class CreateExperienceDto implements CreateExperienceRequest {
  company: string;
  role: string;
  description: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  order?: number;
}

class UpdateExperienceDto implements UpdateExperienceRequest {
  company?: string;
  role?: string;
  description?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  order?: number;
}

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  async getExperience(): Promise<ExperienceDto[]> {
    return this.experienceService.getExperience();
  }

  @Get(':id')
  async getExperienceById(@Param('id') id: string): Promise<ExperienceDto> {
    return this.experienceService.getExperienceById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createExperience(@Body() data: CreateExperienceDto): Promise<ExperienceDto> {
    return this.experienceService.createExperience(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateExperience(@Param('id') id: string, @Body() data: UpdateExperienceDto): Promise<ExperienceDto> {
    return this.experienceService.updateExperience(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteExperience(@Param('id') id: string): Promise<void> {
    return this.experienceService.deleteExperience(id);
  }
}
