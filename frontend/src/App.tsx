import React, { useEffect, useState } from 'react';
import './App.css';

type Note = {
  id: number;
  title: string;
  content: string;
  active: boolean;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([])

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:3000/notes");

        const notes: Note[] = await response.json();

        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNotes();
  }, []);
  
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setActive(note.active);
  }
  const [active, setActive] = useState(true);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title, content, active}),
      }
    );
      const newNote: Note = await response.json();
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
      setActive(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote =  async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/notes/${selectedNote.id}`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/"
          },
          body: JSON.stringify({
            title,
            content,
            active
          })
        }
      )
      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id 
          ? updatedNote 
          : note
        )
      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setActive(active);
      } 
    catch (error) {
      console.log(error);
    }
  };

  const handleActive = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!selectedNote) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/notes/${selectedNote.id}`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/"
          },
          body: JSON.stringify({
            title,
            content,
            active
          })
        }
      )
      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id 
          ? updatedNote 
          : note
        )
      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setActive(!active);
      } 
    catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (e : React.MouseEvent, noteId: number) => {
    e.stopPropagation();

    try {
      await fetch(
        `http://localhost:3000/notes/${noteId}`,
        {
          method: "DELETE",

        }
      )
      const updatedNotes = notes.filter(
        (note)=> note.id !== noteId
      )
      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
    }

  };

  const handleCancel = () => {
    setSelectedNote(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="app-container">
      <form className='note-form' onSubmit={(event)=>
        selectedNote 
          ? handleUpdateNote(event)
          : handleAddNote(event)}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          required
          ></input>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Content'
          rows={10}
          required
          ></textarea>

          {selectedNote ? (
            <div className="edit-buttons">
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleActive}>Archive/Unarchive</button>
            </div>
          ) : (
            <button type='submit'>Add note!</button>
          
          )}
        </form>
        <div className='notes-grid'>
          {notes.map((note)=> (
            <div 
              key={note.id}
              className='note-item'
              onClick={()=> handleNoteClick(note)}>
              <div className='notes-header'>
                <button onClick={(event) =>
                  deleteNote(event, note.id)
                }>x</button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
    </div>
  );
}

export default App;