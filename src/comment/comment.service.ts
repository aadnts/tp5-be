import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private dbService: DbService) {}

  async getComments(bookId: string) {
    return this.dbService.comment.findMany({
      where: {
        bookId: parseInt(bookId),
      },
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
    });
  }

  async addComment(dto: CommentDto) {
    return this.dbService.comment.create({
      data: {
        rating: dto.rating,
        content: dto.content,
        userId: dto.userId,
        bookId: dto.bookId,
      },
      select: {
        id: true,
        rating: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        bookId: true,
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
    });
  }
}
