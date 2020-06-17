const mongoose = require("mongoose");
const { GraphQLDate } = require("graphql-iso-date");
const Schema = mongoose.Schema;

const salaryFields = {
  employeeId: mongoose.Schema.Types.ObjectId,
  salary: Number,
  fromDate: GraphQLDate,
  toDate: GraphQLDate,
};

const salarySchema = new Schema(salaryFields);

const Salary = mongoose.model("Salary", salarySchema);
if (!Salary.collection.collection) {
  Salary.createCollection();
}
module.exports = { Salary, salaryFields };
