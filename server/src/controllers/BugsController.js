import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bugsService } from "../services/BugsService.js";
import { notesService } from "../services/NotesService.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('/:bugId/notes', this.getNotesByBugId)
      .get('/:bugId', this.getBugById)
      .get('', this.getAllBugs)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.editBug)
      .delete('/:bugId', this.deleteBug)
      .get('/:bugId/trackedbugs', this.getUserTrackedBugs)
  }

  async createBug(request, response, next) {
    try {
      const bugData = request.body
      bugData.creatorId = request.userInfo.id
      const bug = await bugsService.createBug(bugData)
      response.send(bug)
    } catch (error) {
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
      const userId = request.userInfo.id
      const updatedBug = await bugsService.editBug(bugId, userId, updateData)
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

  async getNotesByBugId(request, response, next) {
    try {
      const bugId = request.params.bugId
      const notes = await notesService.getNotesByBugId(bugId)
      response.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getUserTrackedBugs(request, response, next) {
    try {
      const bugId = request.params.bugId
      const trackedBugs = await trackedBugsService.getUserTrackedBugs(bugId)
      response.send(trackedBugs)
    } catch (error) {
      next(error)
    }
  }

}