import { IsString, IsOptional, IsDateString, IsUrl, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  fullName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  title?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  location?: string;

  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @IsString()
  @IsOptional()
  quote?: string;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @IsUrl()
  @IsOptional()
  faviconUrl?: string;

  @IsUrl()
  @IsOptional()
  resumeUrl?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  seoTitle?: string;

  @IsString()
  @IsOptional()
  seoDescription?: string;

  @IsString()
  @IsOptional()
  seoKeywords?: string;
}
