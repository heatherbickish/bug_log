import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TrackedBugsService {
  async deleteTrackedBug(trackedBugId, userId) {
    const trackedBug = await dbContext.TrackedBugs.findById(trackedBugId)

    if (trackedBug == null) { throw new Error(`Invalid tracked bug id: ${trackedBugId}`) }
    if (userId != trackedBug.accountId) { throw new Forbidden("DONT BELONG TO YOU GET OUTTA HERE") }

    await trackedBug.deleteOne()
    return trackedBug
  }
  async getMyTrackedBugs(userInfo) {
    const trackedBugs = await dbContext.TrackedBugs.find({ accountId: userInfo }).populate('bug')
    return trackedBugs
  }
  async getTrackedBugsUser(bugId) {
    const trackedBugs = await dbContext.TrackedBugs.find({ bugId: bugId }).populate('tracker', 'name picture')
    return trackedBugs
  }
  async createTrackedBug(trackedBugData) {
    const trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedBug.populate('tracker', 'name picture')
    await trackedBug.populate('bug')
    return trackedBug
  }

}

export const trackedBugsService = new TrackedBugsService()