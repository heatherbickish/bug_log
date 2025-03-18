import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TrackedBugsService {
  async deleteTrackedBug(trackedBugId, userId) {
    const trackedBug = await dbContext.TrackedBugs.findById(trackedBugId)

    if (trackedBug == null) throw new Error(`Invalid tracked bug id: ${trackedBugId}`)
    if (trackedBug.accountId != userId) throw new Forbidden("YOU CANT DELETE THAT, AINT YOURS DEAR")

    await trackedBug.deleteOne()
    return 'No longer tracking that bug'
  }
  async getMyTrackedBugs(userId) {
    const trackedBugs = await dbContext.TrackedBugs.find({ accountId: userId }).populate('bug')
    return trackedBugs
  }
  async getUserTrackedBugs(bugId) {
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