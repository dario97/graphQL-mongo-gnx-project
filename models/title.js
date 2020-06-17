const mongoose = require("mongoose");
const { GraphQLDate } = require("graphql-iso-date");
const Schema = mongoose.Schema;

const titleFields = {
  employeeId: mongoose.Schema.Types.ObjectId,
  title: String,
  fromDate: GraphQLDate,
  toDate: GraphQLDate,
};

const titleSchema = new Schema(titleFields);

const Title = mongoose.model("Title", titleSchema);
if (!Title.collection.collection) {
  Title.createCollection();
}
module.exports = { Title, titleFields };
