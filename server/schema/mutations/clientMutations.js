const { GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/Client");

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
  resolve(parent, args) {
    return Client.findByIdAndDelete(args.id);
  },
};

module.exports = { addClient, deleteClient };
