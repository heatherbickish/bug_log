import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class BugsService {
  async editBug(bugId, userInfo, updateData) {
    const originalBug = await dbContext.Bugs.findById(bugId)

    if (!originalBug) { throw new Error(`Invalid bug id: ${bugId}`) }

    if (userInfo != updateData.creatorId) { throw new Forbidden("NOT ROUND HERE PARTNER, NOT ROUND HERE") }

    // if (updateData.description)
    originalBug.description ??= updateData.description
    originalBug.closed ??= updateData.closed
    originalBug.title ??= updateData.title

    await originalBug.save()
    return originalBug
  }
  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator', 'name picture')
    return bug
  }
  async getAllBugs() {
    const bugs = await dbContext.Bugs.find().populate('creator')
    return bugs
  }
  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator', 'name picture')
    return bug
  }

}

export const bugsService = new BugsService()