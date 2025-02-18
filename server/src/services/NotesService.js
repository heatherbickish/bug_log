import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class NotesService {
  async deleteNote(noteId, userId) {
    const noteToDelete = await dbContext.Notes.findById(noteId)
    if (noteToDelete == null) { throw new Error(`Invalid note id: ${noteId}`) }
    if (noteToDelete.creatorId != userId) { throw new Forbidden("CANT DO THAT IT DONT BELONG TO YOU") }
    await noteToDelete.deleteOne()
    return 'Note has been deleted'
  }
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