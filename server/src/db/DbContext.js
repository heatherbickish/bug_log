import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { BugSchema } from "../models/Bug.js";
import { NoteSchema } from "../models/Note.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', BugSchema);
  Notes = mongoose.model('Note', NoteSchema);


}

export const dbContext = new DbContext()
