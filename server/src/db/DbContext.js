import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BugSchema } from "../models/Bug";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', BugSchema);
}

export const dbContext = new DbContext()
