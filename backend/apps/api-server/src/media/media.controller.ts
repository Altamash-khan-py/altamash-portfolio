import { Controller, Post, Delete, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { FileUploadResponse } from '@portfolio/types';

@Controller('media')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileUploadResponse> {
    return this.mediaService.uploadFile(file);
  }

  @Delete(':filename')
  async deleteFile(@Param('filename') filename: string): Promise<void> {
    return this.mediaService.deleteFile(filename);
  }
}
