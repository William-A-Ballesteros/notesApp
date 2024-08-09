import { Module } from '@nestjs/common';
import { NoteModule } from './Note/note.module';

@Module({
  imports: [NoteModule],
  controllers : [],
  providers: []
})
export class AppModule {}
