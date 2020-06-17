const mongoose = require("mongoose");
const { GraphQLDate } = require("graphql-iso-date");
const Schema = mongoose.Schema;

const employeeFields = {
  dni: Number,
  birthDate: GraphQLDate,
  firstName: String,
  lastName: String,
  gender: String,
  hireDate: GraphQLDate,
};

const employeeSchema = new Schema(employeeFields);

const Employee = mongoose.model("Employee", employeeSchema);
if (!Employee.collection.collection) {
  Employee.createCollection();
}
module.exports = { Employee, employeeFields };
