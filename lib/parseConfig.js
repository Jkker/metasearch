export default function parse(config, platform = 'mobile') {
  const frames = [],
    links = []
  config
    .filter((e) => e.platform?.[platform] === true)
    .forEach((e) => {
      if (e.embeddable) {
        frames.push(e)
      } else {
        links.push(e)
      }
    })
  frames.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
  links.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))

  return { frames, links }
}
