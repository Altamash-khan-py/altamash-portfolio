import { Injectable } from '@nestjs/common';
import { prisma } from '@portfolio/database';
import { AnalyticsOverviewDto, AdminLogDto } from '@portfolio/types';

@Injectable()
export class AnalyticsService {
  async getOverview(): Promise<AnalyticsOverviewDto> {
    const [
      totalSkills,
      totalProjects,
      totalBooks,
      totalExperience,
      totalQuests,
      activeQuests,
      completedQuests,
      featuredProjects,
    ] = await Promise.all([
      prisma.skill.count({ where: { isActive: true } }),
      prisma.project.count({ where: { isActive: true } }),
      prisma.book.count({ where: { isActive: true } }),
      prisma.experience.count({ where: { isActive: true } }),
      prisma.quest.count({ where: { isActive: true } }),
      prisma.quest.count({ where: { isActive: true, status: 'IN_PROGRESS' } }),
      prisma.quest.count({ where: { isActive: true, status: 'COMPLETED' } }),
      prisma.project.count({ where: { isActive: true, isFeatured: true } }),
    ]);

    return {
      totalSkills,
      totalProjects,
      totalBooks,
      totalExperience,
      totalQuests,
      activeQuests,
      completedQuests,
      featuredProjects,
    };
  }

  async getRecentActivity(limit = 10): Promise<AdminLogDto[]> {
    const logs = await prisma.adminLog.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { admin: { select: { email: true } } },
    });

    return logs.map((log) => ({
      id: log.id,
      adminId: log.adminId,
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId || undefined,
      details: log.details as Record<string, unknown> | undefined,
      ipAddress: log.ipAddress || undefined,
      createdAt: log.createdAt.toISOString(),
    }));
  }

  async logActivity(
    adminId: string,
    action: string,
    entityType: string,
    entityId?: string,
    details?: Record<string, unknown>,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<void> {
    await prisma.adminLog.create({
      data: {
        adminId,
        action,
        entityType,
        entityId,
        details,
        ipAddress,
        userAgent,
      },
    });
  }
}
