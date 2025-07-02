import { Controller, Get } from '@nestjs/common';

@Controller('dogs')
export class DogsController {
    @Get()
    getDogs(): string {
        return 'Woof from DogsController!';
    }
}
