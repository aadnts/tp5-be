import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookService } from './book.service';

@UseGuards(JwtGuard)
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getBooks() {
    return this.bookService.getBooks();
  }

  @Get(':id')
  getBook(@Param('id') bookId: string) {
    return this.bookService.getBook(bookId);
  }
  //
  // @Post()
  // createBook(@Body() createBookDto: CreateBookDto) {
  //   return createBookDto;
  // }
  //
  // @Put(':id')
  // updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return updateBookDto;
  // }
  //
  // @Delete(':id')
  // deleteBook(@Param('id') id: string) {
  //   return `Delete book ${id}`;
  // }
}
