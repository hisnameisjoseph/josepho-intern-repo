import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

const mockCatsService = {
  findAll: () => 'Mocked cats list 🐱',
};

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService, // Use the mock service instead of the real one, Token
      useValue: mockCatsService, // Use the mock service to inject
    },
  ],
})
export class CatsModule {}
