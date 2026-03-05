import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@portfolio/database';
import { QuoteDto, CreateQuoteRequest, UpdateQuoteRequest } from '@portfolio/types';

@Injectable()
export class QuotesService {
  async getQuotes(): Promise<QuoteDto[]> {
    const quotes = await prisma.quote.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }],
    });

    return quotes.map((q) => this.mapToDto(q));
  }

  async getFeaturedQuotes(): Promise<QuoteDto[]> {
    const quotes = await prisma.quote.findMany({
      where: { isActive: true, isFeatured: true },
      orderBy: { order: 'asc' },
    });

    return quotes.map((q) => this.mapToDto(q));
  }

  async getQuoteById(id: string): Promise<QuoteDto> {
    const quote = await prisma.quote.findUnique({ where: { id } });
    if (!quote) throw new NotFoundException('Quote not found');
    return this.mapToDto(quote);
  }

  async createQuote(data: CreateQuoteRequest): Promise<QuoteDto> {
    const profile = await prisma.profile.findFirst();
    if (!profile) throw new NotFoundException('Profile not found');

    const quote = await prisma.quote.create({
      data: {
        profileId: profile.id,
        text: data.text,
        author: data.author,
        source: data.source,
        context: data.context,
        isFeatured: data.isFeatured || false,
        order: data.order || 0,
      },
    });

    return this.mapToDto(quote);
  }

  async updateQuote(id: string, data: UpdateQuoteRequest): Promise<QuoteDto> {
    const existing = await prisma.quote.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Quote not found');

    const quote = await prisma.quote.update({ where: { id }, data });
    return this.mapToDto(quote);
  }

  async deleteQuote(id: string): Promise<void> {
    const existing = await prisma.quote.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Quote not found');

    await prisma.quote.update({ where: { id }, data: { isActive: false } });
  }

  private mapToDto(quote: any): QuoteDto {
    return {
      id: quote.id,
      text: quote.text,
      author: quote.author,
      source: quote.source,
      context: quote.context,
      isFeatured: quote.isFeatured,
      order: quote.order,
    };
  }
}
