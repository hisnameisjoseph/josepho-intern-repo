import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    findAll(): string {
    return 'Meow~ from service';
  }
}
