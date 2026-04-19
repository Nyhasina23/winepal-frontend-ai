import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) throw new ForbiddenException('Accès refusé');

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'winepal-secret-key-change-in-prod',
      });
      const user = await this.userModel.findById(payload.sub);
      if (!user || !user.isAdmin) throw new ForbiddenException('Accès réservé aux administrateurs');
      request.user = { userId: payload.sub, email: payload.email, isAdmin: true };
      return true;
    } catch (err) {
      if (err instanceof ForbiddenException) throw err;
      throw new ForbiddenException('Accès refusé');
    }
  }

  private extractToken(request: any): string | null {
    const authHeader = request.headers?.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return null;
  }
}