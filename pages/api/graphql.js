import { ApolloServer } from "apollo-server-micro"
import dbConnect from "lib/dbConnect.js"
import schema from "schemas"

// console.log(schema)
const apolloServer = new ApolloServer({
  schema,
  context(ctx) {
    return ctx
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  await dbConnect()
  const graphqlHandler = await apolloServer.createHandler({ path: "/api/graphql" })
  return graphqlHandler(req, res)
}
