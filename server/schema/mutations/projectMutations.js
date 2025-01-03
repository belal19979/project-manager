const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLEnumType,
} = require("graphql");
const ProjectType = require("../types/ProjectType");
const Project = require("../../models/Project");

const ProjectStatusEnum = new GraphQLEnumType({
  name: "ProjectStatus",
  values: {
    new: { value: "Not Started" },
    progress: { value: "In Progress" },
    completed: { value: "Completed" },
  },
});

const addProject = {
  type: ProjectType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    status: {
      type: ProjectStatusEnum,
      defaultValue: "Not Started",
    },
    clientId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    const project = new Project({
      name: args.name,
      description: args.description,
      status: args.status,
      clientId: args.clientId,
    });
    return project.save();
  },
};

const deleteProject = {
  type: ProjectType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve(parent, args) {
    return Project.findByIdAndDelete(args.id);
  },
};

const updateProject = {
  type: ProjectType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: {
      type: ProjectStatusEnum,
    },
    clientId: { type: GraphQLID },
  },
  resolve(parent, args) {
    const updatedFields = {};
    if (args.name) updatedFields.name = args.name;
    if (args.description) updatedFields.description = args.description;
    if (args.status) updatedFields.status = args.status;
    if (args.clientId) updatedFields.clientId = args.clientId;
    return Project.findByIdAndUpdate(args.id, updatedFields, { new: true });
  },
};

module.exports = { addProject, deleteProject, updateProject };
