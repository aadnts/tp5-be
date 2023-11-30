import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class BookService {
  constructor(private dbService: DbService) {}

  async getBooks() {
    return this.dbService.book.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        discipline: true,
        publicationYear: true,
        language: true,
        editor: true,
        ISBN: true,
        createdAt: true,
        updatedAt: true,
        comments: {
          select: {
            id: true,
            bookId: true,
            rating: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  }

  async getBook(bookId: string) {
    return this.dbService.book.findUnique({
      where: {
        id: parseInt(bookId),
      },
      select: {
        id: true,
        title: true,
        author: true,
        discipline: true,
        publicationYear: true,
        language: true,
        editor: true,
        ISBN: true,
        createdAt: true,
        updatedAt: true,
        comments: {
          select: {
            id: true,
            bookId: true,
            rating: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  }
}
