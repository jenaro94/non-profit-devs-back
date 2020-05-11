const resolvers = {
  Query: {
    me() {
      return {
        email: "jen.calvineo",
        avatar: "jen.calvineo",
        projects: [],
      };
    },
  },
};

module.exports = resolvers;
