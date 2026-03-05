import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@portfolio/database';
import { BookDto, CreateBookRequest, UpdateBookRequest } from '@portfolio/types';

@Injectable()
export class BooksService {
  async getBooks(): Promise<BookDto[]> {
    const books = await prisma.book.findMany({
      where: { isActive: true },
      orderBy: [{ isFavorite: 'desc' }, { readDate: 'desc' }],
    });

    return books.map((b) => this.mapToDto(b));
  }

  async getBookById(id: string): Promise<BookDto> {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return this.mapToDto(book);
  }

  async createBook(data: CreateBookRequest): Promise<BookDto> {
    const profile = await prisma.profile.findFirst();
    if (!profile) throw new NotFoundException('Profile not found');

    const book = await prisma.book.create({
      data: {
        profileId: profile.id,
        title: data.title,
        author: data.author,
        coverUrl: data.coverUrl,
        description: data.description,
        lessons: data.lessons,
        quotes: data.quotes,
        rating: data.rating,
        readDate: data.readDate ? new Date(data.readDate) : null,
        isFavorite: data.isFavorite || false,
        order: data.order || 0,
      },
    });

    return this.mapToDto(book);
  }

  async updateBook(id: string, data: UpdateBookRequest): Promise<BookDto> {
    const existing = await prisma.book.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Book not found');

    const book = await prisma.book.update({
      where: { id },
      data: {
        ...data,
        readDate: data.readDate ? new Date(data.readDate) : undefined,
      },
    });

    return this.mapToDto(book);
  }

  async deleteBook(id: string): Promise<void> {
    const existing = await prisma.book.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Book not found');

    await prisma.book.update({ where: { id }, data: { isActive: false } });
  }

  private mapToDto(book: any): BookDto {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
      description: book.description,
      lessons: book.lessons,
      quotes: book.quotes,
      rating: book.rating,
      readDate: book.readDate?.toISOString(),
      isFavorite: book.isFavorite,
      order: book.order,
    };
  }
}
