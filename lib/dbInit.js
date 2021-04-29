const fs = require('fs-extra')
const path = require('path')
// import Frame from 'models/Frame.js'
// import Link from 'models/Link.js'
import Engine from "models/Engine.js"
import User from 'models/User.js'

export default async function dbInit() {
  console.log('Initializing DB with default configs')
  await buildDefault()
}

const DEFAULT_LOCALES = ['zh-CN', 'en-US']

async function buildDefault() {
  for (const username of DEFAULT_LOCALES) {
    if (!(await User.findOne({ username }))) {
      console.log(username, 'not found. Creating...')
      const file = path.join('data', 'locales', `${username}.json`)
      if (await fs.pathExists(file)) {
        fs.readFile(file, 'utf8')
          .then(JSON.parse)
          .then(async (engines) => {
            const newEngines = await Engine.create(engines).catch(console.log)
            const newUsers = await User.create({
              username,
              email: username + "@example.com",
              config: newEngines.map((i) => i._id),
            }).catch(console.log)
            console.log(
              newUsers.username,
              "successfully created!",
              "\n\tEngines: ",
              newEngines.map((i) => i.title),
              "\n"
            )
          })
          .catch((err) => {
            console.log(err)
            return
          })
      } else {
        console.log(username, 'has no predefined data. Skipping...')

        // await fs.ensureFile(file)
        // auto gen i18n configs
        return
      }
    }
  }
}
