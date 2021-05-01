import dbConnect from 'lib/dbConnect'
import { DBError } from 'lib/errorHandlers'
import User from 'models/User'

export default async function getConfig(name) {
  await dbConnect()

  const user = await User.findOne({
    name,
  })
    .populate('config')
    .exec()
    .catch(DBError)
  const config = await JSON.parse(JSON.stringify(user.config))
  return config
}
