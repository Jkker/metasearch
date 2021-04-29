import dbConnect from 'lib/dbConnect.js'
import dbInit from 'lib/dbInit.js'
import { ClientError, ServerError } from 'lib/errorHandlers.js'
import Frame from 'models/Frame.js'
import User from 'models/User.js'

export default async function handler(req, res) {
  function dbError(error, message = 'Database Error', status = 500) {
    throw new ServerError(message, status, error)
  }

  const {
    method,
    query: { params },
    body,
  } = req
  const [username, _id] = params

  console.log('username:', username, '; engineId:', _id)

  await dbConnect()
  await dbInit()

  try {
    const user = await User.findOne({
      username,
    })
      .populate('frames')
      .exec()
      .catch(dbError)
    if (!user) {
      throw new ClientError('User not found', 404)
    } else {
      switch (method) {
        case 'GET': {
          const frames = !_id ? user['frames'] : user['frames'].filter((e) => e.title === _id)
          if (!frames || frames.length === 0) {
            throw new ClientError('Engine not found', 404)
          } else {
            await res.status(200).json({ success: true, frames })
          }
          break
        }

        case 'POST': {
          const newFrames = await Frame.create(JSON.parse(body)).catch(ClientError)
          user['frames'].push(...(Array.isArray(newFrames) ? newFrames : [newFrames]))
          const updatedUser = await user.save().catch(dbError)
          await res.json({ success: true, delta: newFrames })
          break
        }

        case 'DELETE': {
          await user['frames'].remove({ _id })
          const delta = await Frame.findByIdAndRemove(_id)
          if (!delta) throw new ClientError('Engine not found', 404)
          await res.json({ success: true, delta })
          break
        }

        case 'PATCH': {
          const delta = await Frame.findByIdAndUpdate(_id, body)
          if (!delta) throw new ClientError('Engine not found', 404)
          await res.json({ success: true, delta })
          break
        }
        default: {
          throw new ClientError('Unsupported Request', 405)
        }
      }
    }
  } catch ({ status, message, error }) {
    res.status(status ?? 500).json({ success: false, message, error })
  }
}
