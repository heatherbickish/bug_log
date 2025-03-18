import { Schema } from "mongoose";

export const TrackedBugSchema = new Schema({
  accountId: { type: Schema.ObjectId, ref: 'Account', required: true },
  bugId: { type: Schema.ObjectId, ref: 'Bug', required: true }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  })

TrackedBugSchema.virtual('tracker', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

TrackedBugSchema.virtual('bug', {
  localField: 'bugId',
  ref: 'Bug',
  foreignField: '_id',
  justOne: true
})