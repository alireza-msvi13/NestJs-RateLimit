import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Delete,
  Req,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReplyContactDto } from './dto/reply-contact.dto';
import { ContactQueryDto } from './dto/sort-contact.dto';
import { RateLimit } from '../rate-limit/decorators/rate-limit.decorator';
import { RateLimitGuard } from '../rate-limit/guards/rate-limit.guard';
import express from 'express';
import { parseUserAgent } from '../rate-limit/utils/user-agent.utils';

@Controller('contact')
@ApiTags('Contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(RateLimitGuard)
  @RateLimit({ max: 3, duration: 10 })
  async create(
    @Body() createContactDto: CreateContactDto,
    @Req() req: express.Request,
  ) {
    const userId = req?.user && req.user['id'];
    const ip = req.ip;
    const rawUA = req.headers['user-agent'] || '';
    const ua = parseUserAgent(rawUA);
    const identifier = userId ?? `${ip}:${ua.browser}:${ua.os}:${ua.device}`;

    return this.contactService.create(createContactDto, identifier);
  }

  @Get()
  async findAll(@Query() query: ContactQueryDto) {
    return this.contactService.findAll(query);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.contactService.delete(id);
  }

  @Post(':id/reply')
  @RateLimit({ max: 10, duration: 1 })
  @UseGuards(RateLimitGuard)
  async replyMessage(@Param('id') id: string, @Body() dto: ReplyContactDto) {
    return this.contactService.reply(id, dto);
  }

  @Get(':id/replies')
  async getReplies(@Param('id') id: string) {
    return this.contactService.getReplies(id);
  }
}
