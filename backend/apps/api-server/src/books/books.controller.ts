import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { BookDto, CreateBookRequest, UpdateBookRequest } from '@portfolio/types';

class CreateBookDto implements CreateBookRequest {
  title: string;
  author: string;
  coverUrl?: string;
  description?: string;
  lessons?: string;
  quotes?: string;
  rating?: number;
  readDate?: string;
  isFavorite?: boolean;
  order?: number;
}

class UpdateBookDto implements UpdateBookRequest {
  title?: string;
  author?: string;
  coverUrl?: string;
  description?: string;
  lessons?: string;
  quotes?: string;
  rating?: number;
  readDate?: string;
  isFavorite?: boolean;
  order?: number;
}

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks(): Promise<BookDto[]> {
    return this.booksService.getBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<BookDto> {
    return this.booksService.getBookById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createBook(@Body() data: CreateBookDto): Promise<BookDto> {
    return this.booksService.createBook(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateBook(@Param('id') id: string, @Body() data: UpdateBookDto): Promise<BookDto> {
    return this.booksService.updateBook(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}
