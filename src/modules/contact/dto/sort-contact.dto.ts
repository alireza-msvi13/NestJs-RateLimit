import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { SortContactOption } from '../enum/contact.enum';
import { Transform } from 'class-transformer';

export class ContactQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    enum: SortContactOption,
    default: SortContactOption.Newest,
  })
  @IsOptional()
  @IsEnum(SortContactOption)
  sortBy?: SortContactOption = SortContactOption.Newest;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(100)
  identifier?: string;

  @ApiPropertyOptional({ description: 'Filter by name' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ description: 'Filter by email' })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  email?: string;

  @ApiPropertyOptional({
    title: 'enter phone number',
    nullable: false,
    description: 'Filter by phone',
  })
  @IsOptional()
  @Matches(/^09\d{9}$/, { message: 'Invalid phone number' })
  phone?: string;

  @ApiPropertyOptional({ type: 'boolean' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().toLowerCase() === 'true';
    }
    return value;
  })
  @IsOptional()
  @IsBoolean()
  hasReply?: boolean;
}
