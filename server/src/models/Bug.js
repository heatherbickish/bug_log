import { Schema } from "mongoose";

export const BugSchema = new Schema({
  title: { type: String, maxLength: 50, minLength: 10, required: true },
  description: { type: String, maxLenght: 500, minLength: 10, required: true },
  priority: { type: Number, max: 5, min: 1, required: true },
  closed: { type: Boolean, required: true, default: false },
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

BugSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})