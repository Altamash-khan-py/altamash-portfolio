import { Injectable, BadRequestException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileUploadResponse } from '@portfolio/types';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOAD_DIR = join(process.cwd(), 'uploads');

@Injectable()
export class MediaService {
  constructor() {
    this.ensureUploadDir();
  }

  private async ensureUploadDir(): Promise<void> {
    try {
      await fs.access(UPLOAD_DIR);
    } catch {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<FileUploadResponse> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(`Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`);
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException(`File too large. Max size: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
    }

    const fileExt = file.originalname.split('.').pop();
    const filename = `${uuidv4()}.${fileExt}`;
    const filepath = join(UPLOAD_DIR, filename);

    await fs.writeFile(filepath, file.buffer);

    return {
      id: uuidv4(),
      url: `/uploads/${filename}`,
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
  }

  async deleteFile(filename: string): Promise<void> {
    const filepath = join(UPLOAD_DIR, filename);
    
    try {
      await fs.access(filepath);
      await fs.unlink(filepath);
    } catch {
      throw new BadRequestException('File not found');
    }
  }
}
