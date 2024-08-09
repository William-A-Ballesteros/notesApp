import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  BadRequestException,
  NotFoundException,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all notes' })
  @ApiResponse({ status: 404, description: 'No notes exist' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllNotes() {
    try {
      return this.noteService.getAllNotes();
    } catch (error) {
      throw new NotFoundException('No notes exist');
    }
  }

  @Post()
  @ApiBody({
    description: 'The data to create a new note',
    type: CreateNoteDto,
    examples: {
      example1: {
        summary: 'A simple example',
        value: {
          title: 'Meeting Notes',
          content: 'These are the notes from the meeting held on...',
          active: true,
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Create a new note' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get note by id' })
  @ApiResponse({ status: 400, description: 'Note does not exist' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getNoteById(@Param('id') id: string) {
    const noteFound = await this.noteService.getNoteById(Number(id));
    if (!noteFound) throw new BadRequestException('Note does not exist');
    return noteFound;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete note by id' })
  @ApiResponse({ status: 404, description: 'Note does not exist' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteNoteById(@Param('id') id: string) {
    try {
      return await this.noteService.getNoteById(Number(id));
    } catch (error) {
      throw new NotFoundException('Task does not exist');
    }
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update note by id' })
  @ApiResponse({ status: 404, description: 'Note does not exist' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateNoteById(@Param('id') id: string, @Body() noteUpdateDto: UpdateNoteDto) {
    try {
      return await this.noteService.updateNote(Number(id), noteUpdateDto);
    } catch (error) {
      throw new NotFoundException('Task does not exist');
    }
  }

  @Patch('archive/:id')
  @ApiResponse({ status: 200, description: 'Archive note by id' })
  @ApiResponse({ status: 404, description: 'Note does not exist' })
  @ApiResponse({ status: 500, description: 'Internal server errors' })
  async archiveNote(@Param('id') id: string, @Body() data: Note) {
    try {
      return await this.noteService.archiveNote(Number(id), data);
    } catch (error) {
      throw new NotFoundException('Task does not exist');
    }
  }

  @Patch('unarchive/:id')
  @ApiResponse({ status: 200, description: 'Unarchive note by id' })
  @ApiResponse({ status: 404, description: 'Note does not exist' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async unarchiveNote(@Param('id') id: string, @Body() data: Note) {
    try {
      return await this.noteService.unarchiveNote(Number(id), data);
    } catch (error) {
      throw new NotFoundException('Task does not exist');
    }
  }
}
