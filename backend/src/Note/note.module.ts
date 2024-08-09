import { Module } from "@nestjs/common";
import { NoteController } from "./Note.controller";
import { NoteService } from "./note.service";
import { PrismaModule } from "src/prisma/Prisma.module";

@Module({
    controllers:[NoteController],
    providers:[NoteService],
    imports:[PrismaModule],
})
export class NoteModule{}