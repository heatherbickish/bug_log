import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { BugSchema } from "../models/Bug.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', BugSchema);

}

export const dbContext = new DbContext()
