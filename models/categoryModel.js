const mongoose = require("mongoose");

const catergorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
    },
    imageUrl: {
      type: String,
      default: "https://example.com/images/spicy-bites-logo.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catigory", catergorySchema);
