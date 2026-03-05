import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ProjectDto, CreateProjectRequest, UpdateProjectRequest } from '@portfolio/types';

class CreateProjectDto implements CreateProjectRequest {
  title: string;
  slug?: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  tags?: string[];
  status?: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
  startDate?: string;
  endDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  isFeatured?: boolean;
  order?: number;
}

class UpdateProjectDto implements UpdateProjectRequest {
  title?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  tags?: string[];
  status?: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
  startDate?: string;
  endDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  isFeatured?: boolean;
  order?: number;
}

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(): Promise<ProjectDto[]> {
    return this.projectsService.getProjects();
  }

  @Get(':idOrSlug')
  async getProject(@Param('idOrSlug') idOrSlug: string): Promise<ProjectDto> {
    if (idOrSlug.length === 36) {
      return this.projectsService.getProjectById(idOrSlug);
    }
    return this.projectsService.getProjectBySlug(idOrSlug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createProject(@Body() data: CreateProjectDto): Promise<ProjectDto> {
    return this.projectsService.createProject(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateProject(@Param('id') id: string, @Body() data: UpdateProjectDto): Promise<ProjectDto> {
    return this.projectsService.updateProject(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteProject(@Param('id') id: string): Promise<void> {
    return this.projectsService.deleteProject(id);
  }
}
