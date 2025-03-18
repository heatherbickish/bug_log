import { dbContext } from "../db/DbContext.js"

class BugsService {
  async getAllBugs() {
    const bugs = await dbContext.Bugs.find().populate('creator')
    return bugs
  }
  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator')
    return bug
  }

}

export const bugsService = new BugsService()