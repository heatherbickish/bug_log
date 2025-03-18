import { dbContext } from "../db/DbContext.js"

class NotesService {
  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator', 'name picture')
    return note
  }

}

export const notesService = new NotesService()