import User from 'models/User.js'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Engine from 'models/Engine.js'
import dbConnect from 'lib/dbConnect.js'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  /* pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/onboarding' // If set, new users will be directed here on first sign in
  }, */
  callbacks: {
    /* async signIn(user, account, profile) {
      const dbUser = await User.findOne({ name: user.name })
      if (!dbUser.config || dbUser.config.length === 0) {
        console.log('Initializing user config for', user.name)
        const defaultUser = await User.findOne({ name: 'en-US' })
        dbUser.config = defaultUser.config
        await dbUser.save().catch(console.log)
      }
      user.config = dbUser.config
      console.log('Loaded user config for', user.name)

      return true
    }, */
    session: async (session, user, _sessionToken) => {
      await dbConnect()

      console.log(session)
      session.user._id = user.id
      const dbUser = await User.findOne({ _id: user.id })
        .populate('config')
        .exec()
        .catch(console.log)
      if (dbUser.config && dbUser.config.length !== 0) {
        session.user.config = dbUser.config
        console.log('Loaded config for', user.name)
        return Promise.resolve(session)
      } else {
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
        return Promise.resolve(session)
      }
    },
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,
})
