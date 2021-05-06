export default async (req, res) => {
  // To be initialized
  const defaultUser = await User.findOne({ name: 'en-US' })
    .populate('config')
    .exec()
    .catch(console.log)
  const newConfig = await Engine.create(defaultUser.config).catch(console.log)
  dbUser.config = newConfig.map((i) => i._id)
  await dbUser.save().catch(console.log)
  session.user.config = newConfig
  console.log('Initialized config for', user.name)
  console.log('Loaded config for', user.name)
  // return Promise.resolve(session)
  res.send('Hi')
}
