const { GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/Client");
const Project = require("../../models/Project");

const addClient = {
  type: ClientType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    const client = new Client({
      name: args.name,
      email: args.email,
      phone: args.phone,
    });
    return client.save();
  },
};

const deleteClient = {
  type: ClientType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  async resolve(parent, args) {
    try {
      const projects = await Project.find({ clientId: args.id });
      console.log("Found projects:", projects);
      for (let project of projects) {
        await Project.findByIdAndDelete(project._id);
      }

      const deletedClient = await Client.findByIdAndDelete(args.id);
      return deletedClient;
    } catch (error) {
      console.error("Error in deleteClient resolver:", error);
      throw error;
    }
  },
};

module.exports = { addClient, deleteClient };
