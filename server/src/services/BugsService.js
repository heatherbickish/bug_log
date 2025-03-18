import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class BugsService {
  async deleteBug(bugId, userId) {
    const bug = await dbContext.Bugs.findById(bugId)

    if (bug == null) throw new Error(`Invalid bug id: ${bugId}`)
    if (bug.creatorId != userId) throw new Forbidden("YOU CANT DELETE THAT IT DONT BELONG TO YOU BRAH")

    await bug.deleteOne()
    return 'Bug has been extinquished!!!!!'
  }
  async editBug(bugId, userId, updateData) {
    const originalBug = await dbContext.Bugs.findById(bugId)

    if (!originalBug) throw new Error(`Invalid bug id: ${bugId}`)
    if (userId != updateData.creatorId) throw new Forbidden("YOU CANT EDIT THAT BUG IT DOESNT BELONG TO YOU HUN")

    originalBug.description ??= updateData.description
    originalBug.title ??= updateData.title || originalBug.title
    originalBug.closed ??= updateData.closed
    originalBug.priority ??= updateData.priority

    await originalBug.save()
    return originalBug
  }
  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator', 'name picture')
    return bug
  }
  async getAllBugs() {
    const bugs = await dbContext.Bugs.find().populate('creator', 'name picture')
    return bugs
  }
  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator', 'name picture')
    return bug
  }

}

export const bugsService = new BugsService()