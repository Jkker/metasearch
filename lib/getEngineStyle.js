// export default function getEngineStyle(engine){

// }
const fs = require('fs').promises
const path = require('path')
const simpleIcons = require('simple-icons')
const slug = require('limax')

const getEngineSlug = (engine) => {
  if (engine.slug) return engine.slug
  return slug(engine.title, { tone: false, separator: '' })
}

const getEngineStyle = (engine, defaultHex = '#FFFFFF') => {
  const icon = simpleIcons.get(engine.slug ?? '')
  return {
    hex: icon?.hex ? '#' + icon?.hex : defaultHex,
    svg: icon?.svg ?? null,
  }
}

;(async function main() {
  const data = await fs
    .readFile(path.join('data', 'locales', `zh-CN.json`), 'utf8')
    .catch((err) => {
      console.log(err)
      return
    })
  const config = await JSON.parse(data)

  for (const i of config.frames) {
    i.slug = getEngineSlug(i)
    i.style = getEngineStyle(i)
  }

  for (const i of config.links) {
    i.slug = getEngineSlug(i)
    i.style = getEngineStyle(i)
  }

  await fs.writeFile(
    path.join('data', 'locales', `zh-CN.json`),
    JSON.stringify({
      ...config,
    })
  )
})()
