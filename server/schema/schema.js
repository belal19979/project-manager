const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// Import Types
const ClientType = require("./types/ClientType");
const ProjectType = require("./types/ProjectType");

// Import Queries
const clientQueries = require("./queries/clientQueries");
const projectQueries = require("./queries/projectQueries");

// Import Mutations
const clientMutations = require("./mutations/clientMutations");
const projectMutations = require("./mutations/projectMutations");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Project Queries
    projects: projectQueries.projects,
    project: projectQueries.project,

    // Client Queries
    clients: clientQueries.clients,
    client: clientQueries.client,
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Project Mutations
    addProject: projectMutations.addProject,
    updateProject: projectMutations.updateProject,
    deleteProject: projectMutations.deleteProject,

    // Client Mutations
    addClient: clientMutations.addClient,
    deleteClient: clientMutations.deleteClient,
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
