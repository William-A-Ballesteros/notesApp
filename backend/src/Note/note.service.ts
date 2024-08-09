import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Note } from "@prisma/client";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NoteService{

    constructor(private prisma: PrismaService) {}

        async getAllNotes(): Promise<Note[]>{
            return await this.prisma.note.findMany();
        }
        async getNoteById(id: number) {
            return this.prisma.note.findUnique({where: {id}});
        }
        async create(createNoteDto: CreateNoteDto) {
            return this.prisma.note.create({
                data: createNoteDto
            });
        }
        async updateNote(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
            const note = await this.prisma.note.findUnique({
              where: { id },
            });
        
            if (!note) {
              throw new NotFoundException(`Note with ID ${id} not found`);
            }
        
            return this.prisma.note.update({
              where: { id },
              data: updateNoteDto,
            });
          }
        async deleteNote(id: number): Promise<Note>{
            return this.prisma.note.delete({
                where: {
                    id
                }
            });
        }   
        async archiveNote(id: number, data: Note): Promise<Note>{
            return this.prisma.note.update({
                where: {
                    id
                },
                data : {active: false}
            });
        }

        async unarchiveNote(id: number, data: Note): Promise<Note>{
            return this.prisma.note.update({
                where: {
                    id
                },
                data : {active: true}
            });
        }
}