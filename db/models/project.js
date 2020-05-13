const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
