export default function parse(config, platform = "mobile") {
  const frames = [],
    links = []
  config
    .filter((e) => e.platform[platform] === true)
    .forEach((e) => {
      if (e.embeddable) {
        frames.push(e)
      } else {
        links.push(e)
      }
    })
  return { frames, links }
}
