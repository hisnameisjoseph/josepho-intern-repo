import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup(dto: { email: string; password: string }) {
    return { msg: 'User created!', user: dto };
  }

  signin(dto: { email: string; password: string }) {
    return { msg: 'Logged in!', user: dto };
  }
}
