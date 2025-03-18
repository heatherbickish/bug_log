import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.deleteNote)
  }

  async createNote(request, response, next) {
    try {
      const noteData = request.body
      noteData.creatorId = request.userInfo.id
      const note = await notesService.createNote(noteData)
      response.send(note)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(request, response, next) {
    try {
      const noteId = request.params.noteId
      const userId = request.userInfo.id
      const message = await notesService.deleteNote(noteId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

}