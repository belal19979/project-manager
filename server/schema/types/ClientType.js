const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const ProjectType = require("./ProjectType");
const Project = require("../../models/Project");

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    projects: {
      type: new GraphQLList(require("./ProjectType")),
      resolve(parent, args) {
        return Project.find({ clientId: parent.id });
      },
    },
  }),
});

module.exports = ClientType;
