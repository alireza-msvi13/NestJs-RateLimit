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

@Controller('contact')
@ApiTags('Contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @RateLimit({ max: 3, duration: 10 })
  @UseGuards(RateLimitGuard)
  async create(
    @Body() createContactDto: CreateContactDto,
    @Req() req: express.Request,
  ) {
    return this.contactService.create(createContactDto, req);
  }

  @Post(':id/reply')
  @RateLimit({ max: 10, duration: 1 })
  @UseGuards(RateLimitGuard)
  async replyMessage(@Param('id') id: string, @Body() dto: ReplyContactDto) {
    return this.contactService.reply(id, dto);
  }

  @Get()
  async findAll(@Query() query: ContactQueryDto) {
    return this.contactService.findAll(query);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.contactService.delete(id);
  }

  @Get(':id/replies')
  async getReplies(@Param('id') id: string) {
    return this.contactService.getReplies(id);
  }
}
