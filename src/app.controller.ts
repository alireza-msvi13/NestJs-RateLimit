import { Controller, Get, Head } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Health Check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Server Health Check',
    description:
      'This endpoint can be used by monitoring services to verify that the API server is running and reachable.',
  })
  getHealth() {
    return this.appService.getHealth();
  }

  @Head()
  @ApiOperation({
    summary: 'Server Health Check',
    description:
      'This endpoint can be used by monitoring services to verify that the API server is running and reachable.',
  })
  headHealth() {
    return this.appService.headHealth();
  }
}
