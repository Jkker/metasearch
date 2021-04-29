import dbConnect from 'lib/dbConnect.js'
import { ClientError, ServerError } from 'lib/errorHandlers.js'
import Engine from 'models/Engine.js'
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

  try {
    const user = await User.findOne({
      username,
    })
      .populate('config')
      .exec()
      .catch(dbError)
    if (!user) {
      throw new ClientError('User not found', 404)
    } else {
      switch (method) {
        case 'GET': {
          const config = !_id ? user['config'] : user['config'].filter((e) => e.title === _id)
          if (!config || config.length === 0) {
            throw new ClientError('Engine not found', 404)
          } else {
            await res.status(200).json({ success: true, config })
          }
          break
        }

        case 'POST': {
          const newEngines = await Engine.create(body).catch(ClientError)
          user['config'].push(...(Array.isArray(newEngines) ? newEngines : [newEngines]))
          const updatedUser = await user.save().catch(dbError)
          await res.json({ success: true, delta: newEngines })
          break
        }

        case 'DELETE': {
          await user['config'].remove({ _id })
          const delta = await Engine.findByIdAndRemove(_id)
          if (!delta) throw new ClientError('Engine not found', 404)
          await res.json({ success: true, delta })
          break
        }

        case 'PATCH': {
          const delta = await Engine.findByIdAndUpdate(_id, body, { new: true })
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
