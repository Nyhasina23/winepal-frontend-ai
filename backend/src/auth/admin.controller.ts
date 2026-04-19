import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../common/guards/admin.guard';
import { AuthService } from './auth.service';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private authService: AuthService) {}

  @Get('users')
  async getUsers() {
    return this.authService.getAllUsers();
  }
}