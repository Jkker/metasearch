import { EmailRegexp, UsernameRegexp } from 'lib/regexp'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "can't be blank"],
      match: [UsernameRegexp, 'is invalid'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [EmailRegexp, 'is invalid'],
      index: true,
    },
    image: String,
    hash: String,
    salt: String,
    config: [{ type: Schema.Types.ObjectId, ref: 'Engine' }],
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)

// export const UserTC = createObjectTC(User)
