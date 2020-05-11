const resolvers = {
  Query: {
    allProjects() {
      return [
        {
          id: "1",
          name: "Project 1",
          createdAt: new Date(),
          updatedAt: new Date(),
          users: [],
          contactEmail: "jen.calvineo",
          description: "A test project",
        },
      ];
    },
  },
};

module.exports = resolvers;
