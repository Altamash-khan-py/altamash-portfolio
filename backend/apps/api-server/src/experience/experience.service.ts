import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@portfolio/database';
import { ExperienceDto, CreateExperienceRequest, UpdateExperienceRequest } from '@portfolio/types';

@Injectable()
export class ExperienceService {
  async getExperience(): Promise<ExperienceDto[]> {
    const experiences = await prisma.experience.findMany({
      where: { isActive: true },
      orderBy: [{ isCurrent: 'desc' }, { startDate: 'desc' }],
    });

    return experiences.map((exp) => this.mapToDto(exp));
  }

  async getExperienceById(id: string): Promise<ExperienceDto> {
    const exp = await prisma.experience.findUnique({ where: { id } });
    if (!exp) throw new NotFoundException('Experience not found');
    return this.mapToDto(exp);
  }

  async createExperience(data: CreateExperienceRequest): Promise<ExperienceDto> {
    const profile = await prisma.profile.findFirst();
    if (!profile) throw new NotFoundException('Profile not found');

    const exp = await prisma.experience.create({
      data: {
        profileId: profile.id,
        company: data.company,
        role: data.role,
        description: data.description,
        location: data.location,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        isCurrent: data.isCurrent || false,
        order: data.order || 0,
      },
    });

    return this.mapToDto(exp);
  }

  async updateExperience(id: string, data: UpdateExperienceRequest): Promise<ExperienceDto> {
    const existing = await prisma.experience.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Experience not found');

    const exp = await prisma.experience.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    return this.mapToDto(exp);
  }

  async deleteExperience(id: string): Promise<void> {
    const existing = await prisma.experience.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Experience not found');

    await prisma.experience.update({ where: { id }, data: { isActive: false } });
  }

  private mapToDto(exp: any): ExperienceDto {
    return {
      id: exp.id,
      company: exp.company,
      role: exp.role,
      description: exp.description,
      location: exp.location,
      startDate: exp.startDate.toISOString(),
      endDate: exp.endDate?.toISOString(),
      isCurrent: exp.isCurrent,
      order: exp.order,
    };
  }
}
