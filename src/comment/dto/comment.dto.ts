import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  rating: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  lastName: string;
}
