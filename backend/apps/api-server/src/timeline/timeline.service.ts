import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, TimelineType } from '@portfolio/database';
import { TimelineEventDto, CreateTimelineEventRequest, UpdateTimelineEventRequest } from '@portfolio/types';

@Injectable()
export class TimelineService {
  async getTimeline(): Promise<TimelineEventDto[]> {
    const events = await prisma.timelineEvent.findMany({
      where: { isActive: true },
      orderBy: { date: 'desc' },
    });

    return events.map((e) => this.mapToDto(e));
  }

  async getTimelineByType(type: TimelineType): Promise<TimelineEventDto[]> {
    const events = await prisma.timelineEvent.findMany({
      where: { isActive: true, type },
      orderBy: { date: 'desc' },
    });

    return events.map((e) => this.mapToDto(e));
  }

  async getTimelineEventById(id: string): Promise<TimelineEventDto> {
    const event = await prisma.timelineEvent.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Timeline event not found');
    return this.mapToDto(event);
  }

  async createTimelineEvent(data: CreateTimelineEventRequest): Promise<TimelineEventDto> {
    const profile = await prisma.profile.findFirst();
    if (!profile) throw new NotFoundException('Profile not found');

    const event = await prisma.timelineEvent.create({
      data: {
        profileId: profile.id,
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        type: (data.type as TimelineType) || 'PERSONAL',
        icon: data.icon,
        color: data.color,
        linkUrl: data.linkUrl,
        linkText: data.linkText,
        order: data.order || 0,
      },
    });

    return this.mapToDto(event);
  }

  async updateTimelineEvent(id: string, data: UpdateTimelineEventRequest): Promise<TimelineEventDto> {
    const existing = await prisma.timelineEvent.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Timeline event not found');

    const event = await prisma.timelineEvent.update({
      where: { id },
      data: {
        ...data,
        type: data.type as TimelineType | undefined,
        date: data.date ? new Date(data.date) : undefined,
      },
    });

    return this.mapToDto(event);
  }

  async deleteTimelineEvent(id: string): Promise<void> {
    const existing = await prisma.timelineEvent.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Timeline event not found');

    await prisma.timelineEvent.update({ where: { id }, data: { isActive: false } });
  }

  private mapToDto(event: any): TimelineEventDto {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date.toISOString(),
      type: event.type,
      icon: event.icon,
      color: event.color,
      linkUrl: event.linkUrl,
      linkText: event.linkText,
      order: event.order,
    };
  }
}
