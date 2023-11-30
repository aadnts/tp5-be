import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

/* ---------------------------------------------------------------------------------------- */
@Injectable()
export class AuthService {
  constructor(
    private dbService: DbService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  /* ---------------------------------------------------------------------------------------- */
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.dbService.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Email already exists',
          );
        }
      }
      throw error;
    }
  }

  /* ---------------------------------------------------------------------------------------- */
  async signin(dto: AuthDto) {
    const user = await this.dbService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException(
        'Invalid credentials',
      );
    }

    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );

    if (!pwMatches) {
      throw new ForbiddenException(
        'Invalid credentials',
      );
    }

    return this.signToken(user.id, user.email);
  }

  /* ---------------------------------------------------------------------------------------- */
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  /* ---------------------------------------------------------------------------------------- */
}
