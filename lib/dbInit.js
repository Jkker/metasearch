const fs = require('fs-extra')
const path = require('path')
// import Frame from 'models/Frame.js'
// import Link from 'models/Link.js'
import Engine from 'models/Engine.js'
import User from 'models/User.js'

const DEFAULT_LOCALES = ['zh-CN', 'en-US']

export default async function dbInit() {
  console.log('Initializing DB with default configs')
  for (const name of DEFAULT_LOCALES) {
    await localeInit(name, name + '@example.com')
  }
}

export async function localeInit(name, email) {
  if (!(await User.findOne({ name }))) {
    console.log(name, 'not found. Creating...')
    const file = path.join('data', 'locales', `${name}.json`)
    if (await fs.pathExists(file)) {
      fs.readFile(file, 'utf8')
        .then(JSON.parse)
        .then(async (engines) => {
          const newEngines = await Engine.create(engines).catch(console.log)
          const newUsers = await User.create({
            name,
            email,
            config: newEngines.map((i) => i._id),
          }).catch(console.log)
          console.log(
            newUsers.name,
            'successfully created!',
            '\n\tEngines: ',
            newEngines.map((i) => i.title),
            '\n'
          )
        })
        .catch((err) => {
          console.log(err)
          return
        })
    } else {
      console.log(name, 'has no predefined data. Skipping...')
      // await fs.ensureFile(file)
      // auto gen i18n configs
      return
    }
  }
}

export async function userInit(name, email) {
  const user = await User.findOne({ name })
  if (!user.config || user.config.length === 0) {
    const defaultUser = await User.findOne({ name: 'en-US' })
    user.config = defaultUser.config
    await user.save().catch(console.log)
  }
}
