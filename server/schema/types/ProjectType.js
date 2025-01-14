const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const ClientType = require("./ClientType");
const Client = require("../../models/Client");

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: require("./ClientType"),
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

module.exports = ProjectType;
