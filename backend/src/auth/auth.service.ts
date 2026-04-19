import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string) {
    const existing = await this.userModel.findOne({ email });
    if (existing) throw new ConflictException('Un compte existe déjà avec cet email');

    const hashed = await bcrypt.hash(password, 12);
    const user = await this.userModel.create({ email, password: hashed, name });

    const payload = { sub: user._id.toString(), email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user._id, email: user.email, name: user.name, isAdmin: !!user.isAdmin },
    };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Email ou mot de passe incorrect');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Email ou mot de passe incorrect');

    const payload = { sub: user._id.toString(), email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user._id, email: user.email, name: user.name, isAdmin: !!user.isAdmin },
    };
  }

  async validateUser(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }

  async getAllUsers() {
    return this.userModel.find().select('-password').sort({ createdAt: -1 }).lean();
  }
}
