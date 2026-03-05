import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { prisma, ProjectStatus } from '@portfolio/database';
import { ProjectDto, CreateProjectRequest, UpdateProjectRequest } from '@portfolio/types';
import { slugify } from '@portfolio/utils';

@Injectable()
export class ProjectsService {
  async getProjects(): Promise<ProjectDto[]> {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }],
    });

    return projects.map((p) => this.mapToDto(p));
  }

  async getProjectById(id: string): Promise<ProjectDto> {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return this.mapToDto(project);
  }

  async getProjectBySlug(slug: string): Promise<ProjectDto> {
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) throw new NotFoundException('Project not found');
    return this.mapToDto(project);
  }

  async createProject(data: CreateProjectRequest): Promise<ProjectDto> {
    const profile = await prisma.profile.findFirst();
    if (!profile) throw new NotFoundException('Profile not found');

    const slug = data.slug || slugify(data.title);
    
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) throw new ConflictException('Project with this slug already exists');

    const project = await prisma.project.create({
      data: {
        profileId: profile.id,
        title: data.title,
        slug,
        description: data.description,
        shortDescription: data.shortDescription,
        thumbnailUrl: data.thumbnailUrl,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        tags: data.tags || [],
        status: (data.status as ProjectStatus) || 'IN_PROGRESS',
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        isFeatured: data.isFeatured || false,
        order: data.order || 0,
      },
    });

    return this.mapToDto(project);
  }

  async updateProject(id: string, data: UpdateProjectRequest): Promise<ProjectDto> {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Project not found');

    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await prisma.project.findUnique({ where: { slug: data.slug } });
      if (slugExists) throw new ConflictException('Project with this slug already exists');
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        status: data.status as ProjectStatus | undefined,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    return this.mapToDto(project);
  }

  async deleteProject(id: string): Promise<void> {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Project not found');

    await prisma.project.update({ where: { id }, data: { isActive: false } });
  }

  private mapToDto(project: any): ProjectDto {
    return {
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      shortDescription: project.shortDescription,
      thumbnailUrl: project.thumbnailUrl,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      tags: project.tags,
      status: project.status,
      startDate: project.startDate?.toISOString(),
      endDate: project.endDate?.toISOString(),
      seoTitle: project.seoTitle,
      seoDescription: project.seoDescription,
      isFeatured: project.isFeatured,
      order: project.order,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    };
  }
}
