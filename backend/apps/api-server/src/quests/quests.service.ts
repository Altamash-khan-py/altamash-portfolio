import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, QuestStatus, QuestPriority } from '@portfolio/database';
import { QuestDto, CreateQuestRequest, UpdateQuestRequest } from '@portfolio/types';

@Injectable()
export class QuestsService {
  async getQuests(): Promise<QuestDto[]> {
    const quests = await prisma.quest.findMany({
      where: { isActive: true },
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    });

    return quests.map((q) => this.mapToDto(q));
  }

  async getQuestById(id: string): Promise<QuestDto> {
    const quest = await prisma.quest.findUnique({ where: { id } });
    if (!quest) throw new NotFoundException('Quest not found');
    return this.mapToDto(quest);
  }

  async createQuest(data: CreateQuestRequest): Promise<QuestDto> {
    const profile = await prisma.profile.findFirst();
    if (!profile) throw new NotFoundException('Profile not found');

    const quest = await prisma.quest.create({
      data: {
        profileId: profile.id,
        title: data.title,
        description: data.description,
        status: (data.status as QuestStatus) || 'IDEA',
        priority: (data.priority as QuestPriority) || 'MEDIUM',
        tags: data.tags || [],
        startDate: data.startDate ? new Date(data.startDate) : null,
        targetDate: data.targetDate ? new Date(data.targetDate) : null,
        order: data.order || 0,
      },
    });

    return this.mapToDto(quest);
  }

  async updateQuest(id: string, data: UpdateQuestRequest): Promise<QuestDto> {
    const existing = await prisma.quest.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Quest not found');

    const quest = await prisma.quest.update({
      where: { id },
      data: {
        ...data,
        status: data.status as QuestStatus | undefined,
        priority: data.priority as QuestPriority | undefined,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        targetDate: data.targetDate ? new Date(data.targetDate) : null,
        completedAt: data.status === 'COMPLETED' && !existing.completedAt 
          ? new Date() 
          : data.status !== 'COMPLETED' 
            ? null 
            : undefined,
      },
    });

    return this.mapToDto(quest);
  }

  async deleteQuest(id: string): Promise<void> {
    const existing = await prisma.quest.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Quest not found');

    await prisma.quest.update({ where: { id }, data: { isActive: false } });
  }

  private mapToDto(quest: any): QuestDto {
    return {
      id: quest.id,
      title: quest.title,
      description: quest.description,
      status: quest.status,
      priority: quest.priority,
      tags: quest.tags,
      startDate: quest.startDate?.toISOString(),
      targetDate: quest.targetDate?.toISOString(),
      completedAt: quest.completedAt?.toISOString(),
      order: quest.order,
    };
  }
}
