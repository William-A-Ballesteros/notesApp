import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    description: 'The title of the note',
    example: 'Meeting Notes',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the note',
    example: 'These are the notes from the meeting held on...'
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Indicates if the note is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
}