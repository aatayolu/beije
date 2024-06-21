import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    require('dotenv').config();
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async register(username: string, email: string): Promise<User> {
    const verificationToken = uuidv4();
    const user = this.userRepository.create({
      username,
      email,
      verificationToken,
    });
    await this.userRepository.save(user);
    await this.sendVerificationEmail(email, verificationToken);
    return user;
  }

  async sendVerificationEmail(email: string, token: string) {
    const msg = {
      to: email,
      from: 'beije.intern@hotmail.com',
      subject: 'Email Verification',
      text: `Please verify your email by using the following token: ${token}`,
    };

    try {
      await sgMail.send(msg);
      console.log(`Verification email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send verification email to ${email}`, error);
    }
  }

  async verifyEmail(username: string, token: string): Promise<boolean> {
    console.log(`Verifying email for user: ${username} with token: ${token}`);
    
    const user = await this.userRepository.findOne({ where: { username } });
    
    // console.log('User retrieved from database:', user);
    
    if (!user || user.verificationToken !== token) {
      console.log('Verification failed: User not found or token mismatch');
      return false;
    }
    
    user.isVerified = true;
    await this.userRepository.save(user);
    
    console.log(`User ${username} has been successfully verified.`);
    return true;
  }
  
  

  async checkVerification(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user?.isVerified || false;
  }
}
