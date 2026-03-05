import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ProfileDto, UpdateProfileRequest } from '@portfolio/types';
import { UpdateProfileDto } from './dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(): Promise<ProfileDto> {
    return this.profileService.getProfile();
  }

  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateProfile(@Body() data: UpdateProfileDto): Promise<ProfileDto> {
    return this.profileService.updateProfile(data);
  }
}
