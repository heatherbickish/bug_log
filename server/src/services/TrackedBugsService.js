import { dbContext } from "../db/DbContext.js"

class TrackedBugsService {
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