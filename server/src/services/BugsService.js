import { dbContext } from "../db/DbContext"

class BugsService {
  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator', 'name picture')
    return bug
  }

}

export const bugsService = new BugsService()