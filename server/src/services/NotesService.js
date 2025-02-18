import { dbContext } from "../db/DbContext"

class NotesService {
  async getAllNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId: bugId })
    if (notes == null) { throw new Error(`Invalid your face: ${bugId}`) }
    return notes
  }
  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator', 'name picture')
    return note
  }

}

export const notesService = new NotesService()