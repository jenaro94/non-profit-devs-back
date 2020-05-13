const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");

const User = require("../db/models/user");
const Project = require("../db/models/project");
const { isAuthenticated } = require("./middleware");

const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => {
      const user = await User.findOne({ _id: id });
      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (user) {
          throw new Error(`Email ${input.email} already in use`);
        }

        const passw = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/);
        if (!input.password.match(passw)) {
          throw new Error(
            `Password must contain 1 uppercase letter, 1 lowercase letter, a number and be at least 8 characters long.`
          );
        }

        const hashedPassword = await bcrypt.hash(input.password, 12);
        const newUser = new User({ ...input, password: hashedPassword });
        const result = newUser.save();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          input.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Email or password is incorrect");
        }

        const secret = process.env.JWT_SECRET_KEY || "mysecretkey";
        const token = jwt.sign({ email: user.email }, secret, {
          expiresIn: "1d",
        });
        return { token };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    addProjectToUser: combineResolvers(
      isAuthenticated,
      async (_, { id, input }) => {
        try {
          const user = await User.findOne({ _id: id });
          const project = await Project.findOne({ _id: input.project });
          if (!user || !project) {
            throw new Error(
              `User with id: ${id} or project with id: ${input.project} could not be found`
            );
          }

          project.users.push(id);
          user.projects.push(input.project);
          await project.save();
          return await user.save();
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
  },
  User: {
    projects: async ({ projects }) => {
      const projectsRes = await Project.find({ _id: { $in: projects } });
      return projectsRes || [];
    },
  },
};

module.exports = resolvers;
