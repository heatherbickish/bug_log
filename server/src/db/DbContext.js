import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BugSchema } from "../models/Bug";
import { NoteSchema } from "../models/Note";
import { TrackedBugSchema } from "../models/TrackedBug";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', BugSchema);
  Notes = mongoose.model('Note', NoteSchema);
  TrackedBugs = mongoose.model('TrackedBug', TrackedBugSchema);
}

export const dbContext = new DbContext()
