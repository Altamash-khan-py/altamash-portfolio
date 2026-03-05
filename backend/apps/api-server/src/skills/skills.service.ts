import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, SkillLevel } from '@portfolio/database';
import { SkillDto, SkillCategoryDto, CreateSkillRequest, UpdateSkillRequest } from '@portfolio/types';

@Injectable()
export class SkillsService {
  /**
   * Get all skills grouped by category
   */
  async getSkills(): Promise<SkillCategoryDto[]> {
    const categories = await prisma.skillCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        skills: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    return categories.map((category) => this.mapToCategoryDto(category));
  }

  /**
   * Get skill by ID
   */
  async getSkillById(id: string): Promise<SkillDto> {
    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    return this.mapToSkillDto(skill);
  }

  /**
   * Create new skill
   */
  async createSkill(data: CreateSkillRequest): Promise<SkillDto> {
    const profile = await prisma.profile.findFirst();
    
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const skill = await prisma.skill.create({
      data: {
        profileId: profile.id,
        name: data.name,
        level: data.level as SkillLevel,
        categoryId: data.categoryId,
        description: data.description,
        icon: data.icon,
        order: data.order || 0,
      },
    });

    return this.mapToSkillDto(skill);
  }

  /**
   * Update skill
   */
  async updateSkill(id: string, data: UpdateSkillRequest): Promise<SkillDto> {
    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      throw new NotFoundException('Skill not found');
    }

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        ...data,
        level: data.level as SkillLevel | undefined,
      },
    });

    return this.mapToSkillDto(skill);
  }

  /**
   * Delete skill
   */
  async deleteSkill(id: string): Promise<void> {
    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      throw new NotFoundException('Skill not found');
    }

    await prisma.skill.update({
      where: { id },
      data: { isActive: false },
    });
  }

  /**
   * Map Prisma SkillCategory to SkillCategoryDto
   */
  private mapToCategoryDto(category: any): SkillCategoryDto {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      order: category.order,
      skills: category.skills?.map((skill: any) => this.mapToSkillDto(skill)) || [],
    };
  }

  /**
   * Map Prisma Skill to SkillDto
   */
  private mapToSkillDto(skill: any): SkillDto {
    return {
      id: skill.id,
      name: skill.name,
      level: skill.level,
      description: skill.description,
      icon: skill.icon,
      order: skill.order,
      categoryId: skill.categoryId,
    };
  }
}
