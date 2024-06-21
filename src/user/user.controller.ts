import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello() : string {
    return this.userService.getHello();
  }

  @Post('register')
  async register(@Body() body: { username: string; email: string }) {
    return this.userService.register(body.username, body.email);
  }

  @Get('verify-email/:username/:token')
  async verifyEmail(
    @Param('username') username: string,
    @Param('token') token: string,
  ) {
    const verified = await this.userService.verifyEmail(username, token);
    return { verified };
  }

  @Get('check-verification/:username')
  async checkVerification(@Param('username') username: string) {
    const verified = await this.userService.checkVerification(username);
    return { verified };
  }
}
