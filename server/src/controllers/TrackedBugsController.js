import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";

export class TrackedBugsController extends BaseController {
  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
      .delete('/:trackedBugId', this.deleteTrackedBug)
  }

  async createTrackedBug(request, response, next) {
    try {
      const trackedBugData = request.body
      trackedBugData.accountId = request.userInfo.id
      const trackedBug = await trackedBugsService.createTrackedBug(trackedBugData)
      response.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }

  async deleteTrackedBug(request, response, next) {
    try {
      const trackedBugId = request.params.trackedBugId
      const userId = request.userInfo.id
      const message = await trackedBugsService.deleteTrackedBug(trackedBugId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

}