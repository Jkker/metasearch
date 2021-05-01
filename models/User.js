import { EmailRegexp, UsernameRegexp } from 'lib/regexp'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
      // match: [UsernameRegexp, 'Username invalid'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      // required: [true, "can't be blank"],
      match: [EmailRegexp, 'Email invalid'],
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
