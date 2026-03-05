import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@portfolio/database';
import { ProfileDto, SocialLinkDto, UpdateProfileRequest } from '@portfolio/types';

@Injectable()
export class ProfileService {
  /**
   * Get public profile
   */
  async getProfile(): Promise<ProfileDto> {
    const profile = await prisma.profile.findFirst({
      where: { isActive: true },
      include: {
        socialLinks: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return this.mapToProfileDto(profile);
  }

  /**
   * Update profile
   */
  async updateProfile(data: UpdateProfileRequest): Promise<ProfileDto> {
    const existingProfile = await prisma.profile.findFirst();

    if (!existingProfile) {
      throw new NotFoundException('Profile not found');
    }

    const profile = await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      },
      include: {
        socialLinks: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    return this.mapToProfileDto(profile);
  }

  /**
   * Map Prisma Profile to ProfileDto
   */
  private mapToProfileDto(profile: any): ProfileDto {
    return {
      id: profile.id,
      fullName: profile.fullName,
      title: profile.title,
      bio: profile.bio,
      location: profile.location,
      birthDate: profile.birthDate?.toISOString(),
      quote: profile.quote,
      avatarUrl: profile.avatarUrl,
      faviconUrl: profile.faviconUrl,
      resumeUrl: profile.resumeUrl,
      seoTitle: profile.seoTitle,
      seoDescription: profile.seoDescription,
      seoKeywords: profile.seoKeywords,
      socialLinks: profile.socialLinks?.map((link: any) => this.mapToSocialLinkDto(link)) || [],
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    };
  }

  /**
   * Map Prisma SocialLink to SocialLinkDto
   */
  private mapToSocialLinkDto(link: any): SocialLinkDto {
    return {
      id: link.id,
      platform: link.platform,
      url: link.url,
      order: link.order,
    };
  }
}
