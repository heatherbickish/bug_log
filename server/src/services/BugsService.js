import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class BugsService {
  async deleteBug(bugId, userId) {
    const bugToDelete = await dbContext.Bugs.findById(bugId)

    if (bugToDelete == null) { throw new Error(`Invalid bug id: ${bugId}`) }
    if (bugToDelete.creatorId != userId) { throw new Forbidden("CANNOT DELETE THAT IT DONT BELONG TO YOU") }
    await bugToDelete.deleteOne()

    return 'Bug has been exterminated'
  }
  async editBug(bugId, userId, updateData) {
    const originalBug = await dbContext.Bugs.findById(bugId)
    if (!originalBug) { throw new Error(`NO BUGS FOR YOU, ${bugId}`) }
    if (userId != originalBug.creatorId) {
      throw new Forbidden('You cant update that you dont own it')
    }
    if (updateData.description) originalBug.description = updateData.description
    originalBug.closed ??= updateData.closed
    originalBug.title = updateData.title || originalBug.title
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
    // if (bugData.priority) { throw new Error('Invalid priority') }
    return bug
  }

}

export const bugsService = new BugsService()