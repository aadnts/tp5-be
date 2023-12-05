import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  // UseGuards,
} from '@nestjs/common';
// import { JwtGuard } from 'src/auth/guard';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentController {
  constructor(
    private commentService: CommentService,
  ) {}

  @Get(':id')
  getComments(@Param('id') bookId: string) {
    return this.commentService.getComments(bookId);
  }

  // @UseGuards(JwtGuard)
  @Post()
  signin(@Body() dto: CommentDto) {
    return this.commentService.addComment(dto);
  }
}
