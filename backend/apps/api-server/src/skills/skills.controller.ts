import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SkillDto, SkillCategoryDto, CreateSkillRequest, UpdateSkillRequest } from '@portfolio/types';
import { CreateSkillDto, UpdateSkillDto } from './dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async getSkills(): Promise<SkillCategoryDto[]> {
    return this.skillsService.getSkills();
  }

  @Get(':id')
  async getSkillById(@Param('id') id: string): Promise<SkillDto> {
    return this.skillsService.getSkillById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createSkill(@Body() data: CreateSkillDto): Promise<SkillDto> {
    return this.skillsService.createSkill(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateSkill(
    @Param('id') id: string,
    @Body() data: UpdateSkillDto,
  ): Promise<SkillDto> {
    return this.skillsService.updateSkill(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteSkill(@Param('id') id: string): Promise<void> {
    return this.skillsService.deleteSkill(id);
  }
}
