import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { QuoteDto, CreateQuoteRequest, UpdateQuoteRequest } from '@portfolio/types';

class CreateQuoteDto implements CreateQuoteRequest {
  text: string;
  author: string;
  source?: string;
  context?: string;
  isFeatured?: boolean;
  order?: number;
}

class UpdateQuoteDto implements UpdateQuoteRequest {
  text?: string;
  author?: string;
  source?: string;
  context?: string;
  isFeatured?: boolean;
  order?: number;
}

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  async getQuotes(): Promise<QuoteDto[]> {
    return this.quotesService.getQuotes();
  }

  @Get('featured')
  async getFeaturedQuotes(): Promise<QuoteDto[]> {
    return this.quotesService.getFeaturedQuotes();
  }

  @Get(':id')
  async getQuoteById(@Param('id') id: string): Promise<QuoteDto> {
    return this.quotesService.getQuoteById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createQuote(@Body() data: CreateQuoteDto): Promise<QuoteDto> {
    return this.quotesService.createQuote(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateQuote(@Param('id') id: string, @Body() data: UpdateQuoteDto): Promise<QuoteDto> {
    return this.quotesService.updateQuote(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteQuote(@Param('id') id: string): Promise<void> {
    return this.quotesService.deleteQuote(id);
  }
}
