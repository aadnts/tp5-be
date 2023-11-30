import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  discipline: string;

  @IsNotEmpty()
  publicationYear: number;

  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsString()
  editor: string;

  @IsNotEmpty()
  @IsString()
  ISBN: string;

  @IsOptional()
  comments: Comment[];
}
