import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class NotesService {
  async deleteNote(noteId, userId) {
    const note = await dbContext.Notes.findById(noteId)

    if (note == null) throw new Error(`Invalid note id: ${noteId}`)
    if (note.creatorId != userId) throw new Forbidden("YOU CANT DELETE THAT ITS NOT YOURS HOMMIE")

    await note.deleteOne()
    return 'Note was lit on fire'
  }
  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId: bugId })

    if (notes == null) throw new Error(`Invalid bug id: ${bugId}`)
    return notes
  }
  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator', 'name picture')
    return note
  }

}

export const notesService = new NotesService()