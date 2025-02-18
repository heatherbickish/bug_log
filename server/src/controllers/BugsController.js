import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { bugsService } from "../services/BugsService";
import { notesService } from "../services/NotesService";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:bugId', this.getBugById)
      .get('/:bugId/notes', this.getAllNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.editBug)
      .delete('/:bugId', this.deleteBug)
  }



  async createBug(request, response, next) {
    try {
      const bugData = request.body
      bugData.creatorId = request.userInfo.id
      const bug = await bugsService.createBug(bugData)
      response.send(bug)
    }
    catch (error) {
      next(error)
    }
  }

  async getAllBugs(request, response, next) {
    try {
      const bugs = await bugsService.getAllBugs()
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bug = await bugsService.getBugById(bugId)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const updateData = request.body
      const userInfo = request.userInfo
      const updatedBug = await bugsService.editBug(bugId, userInfo.id, updateData)
      response.send(updatedBug)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const userId = request.userInfo.id
      const message = await bugsService.deleteBug(bugId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotesByBugId(request, response, next) {
    try {
      const bugId = request.params.bugId
      const notes = await notesService.getAllNotesByBugId(bugId)
      response.send(notes)
    } catch (error) {
      next(error)
    }
  }
}