import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { CommentModule } from './comment/comment.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    BookModule,
    CommentModule,
    DbModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
