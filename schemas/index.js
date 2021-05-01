import { SchemaComposer } from "graphql-compose"
import { composeWithMongoose } from "graphql-compose-mongoose"
import Engine from "models/Engine"
import User from "models/User"
const schemaComposer = new SchemaComposer()

function createObjectTC(model, customizationOptions = {}) {
  let ModelTC = null

  try {
    ModelTC = schemaComposer.getOTC(model.modelName)
    console.log(ModelTC)
  } catch {
    ModelTC = composeWithMongoose(model, customizationOptions)
  }

  return ModelTC
}

const EngineTC = createObjectTC(Engine, { schemaComposer })
const EngineQuery = {
  engineById: EngineTC.getResolver("findById"),
  engineByIds: EngineTC.getResolver("findByIds"),
  engineOne: EngineTC.getResolver("findOne"),
  engineMany: EngineTC.getResolver("findMany").debug(),
  engineCount: EngineTC.getResolver("count"),
  engineConnection: EngineTC.getResolver("connection"),
  enginePagination: EngineTC.getResolver("pagination"),
}
const EngineMutation = {
  engineCreateOne: EngineTC.getResolver("createOne"),
  engineCreateMany: EngineTC.getResolver("createMany"),
  engineUpdateById: EngineTC.getResolver("updateById"),
  engineUpdateOne: EngineTC.getResolver("updateOne"),
  // engineFindOneAndUpdate: EngineTC.getResolver("findOneAndUpdate"),
  engineUpdateMany: EngineTC.getResolver("updateMany"),
  engineRemoveById: EngineTC.getResolver("removeById"),
  engineRemoveOne: EngineTC.getResolver("removeOne"),
  engineRemoveMany: EngineTC.getResolver("removeMany"),
}

const UserTC = createObjectTC(User, { schemaComposer })
const UserQuery = {
  userById: UserTC.getResolver("findById"),
  userByIds: UserTC.getResolver("findByIds"),
  userOne: UserTC.getResolver("findOne"),
  userMany: UserTC.getResolver("findMany").debug(),
  userCount: UserTC.getResolver("count"),
  userConnection: UserTC.getResolver("connection"),
  userPagination: UserTC.getResolver("pagination"),
}
const UserMutation = {
  userCreateOne: UserTC.getResolver("createOne"),
  userCreateMany: UserTC.getResolver("createMany"),
  userUpdateById: UserTC.getResolver("updateById"),
  userUpdateOne: UserTC.getResolver("updateOne"),
  userUpdateMany: UserTC.getResolver("updateMany"),
  userRemoveById: UserTC.getResolver("removeById"),
  userRemoveOne: UserTC.getResolver("removeOne"),
  userRemoveMany: UserTC.getResolver("removeMany"),
}

schemaComposer.Query.addFields({
  ...UserQuery,
  ...EngineQuery,
})

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...EngineMutation,
})

export default schemaComposer.buildSchema()
