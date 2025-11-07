import { ApiTags } from '@nestjs/swagger';
import { RateLimitService } from './rate-limit.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlockUserDto, RateLimitQueryDto } from './dto/rate-limit-query.dto';

@Controller('rate-limit')
@ApiTags('RateLimit')
export class RateLimitController {
  constructor(private readonly rateLimitService: RateLimitService) {}

  @Get('records')
  async getRateLimitRecords(@Query() rateLimitQueryDto: RateLimitQueryDto) {
    return await this.rateLimitService.getRateLimitRecords(rateLimitQueryDto);
  }

  @Get('record/:id')
  async findOne(@Param('id') id: string) {
    return await this.rateLimitService.findById(id);
  }

  @Post('block/:id')
  async blockUser(@Param('id') id: string, @Body() dto: BlockUserDto) {
    return this.rateLimitService.blockManually(id, dto);
  }

  @Post('unblock/:id')
  async unblockUser(@Param('id') id: string) {
    return this.rateLimitService.unblockManually(id);
  }

  @Post('reset/:id')
  reset(@Param('id') id: string) {
    return this.rateLimitService.resetById(id);
  }

  @Get('stats')
  stats() {
    return this.rateLimitService.getStats();
  }
}
