const resolvers = {
  Query: {
    me() {
      return {
        id: "1",
        name: "Jenaro",
        createdAt: new Date(),
        updatedAt: new Date(),
        projects: [],
        email: "jen.calvineo",
      };
    },
  },
};

module.exports = resolvers;
