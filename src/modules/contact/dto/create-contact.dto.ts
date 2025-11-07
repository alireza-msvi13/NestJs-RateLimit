import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'edward' })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'edward@gmail.com' })
  @IsString()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Invalid phone number' })
  @Matches(/^09\d{9}$/, { message: 'Invalid phone number' })
  @ApiProperty({
    title: 'enter phone number',
    example: '09375012365',
    nullable: false,
  })
  phone: string;

  @ApiProperty({ example: 'I have a problem with my order...' })
  @IsString()
  @IsNotEmpty({ message: 'Message cannot be empty' })
  @MaxLength(1000)
  message: string;
}
