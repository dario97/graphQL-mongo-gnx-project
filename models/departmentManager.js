const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { GraphQLDate } = require("graphql-iso-date");

const departmentManagerFields = {
  employeeId: mongoose.Schema.Types.ObjectId,
  departmentId: mongoose.Schema.Types.ObjectId,
  fromDate: GraphQLDate,
  toDate: GraphQLDate,
};

const departmentManagerSchema = new Schema(departmentManagerFields);

const DepartmentManager = mongoose.model(
  "DepartmentManager",
  departmentManagerSchema
);
if (!DepartmentManager.collection.collection) {
  DepartmentManager.createCollection();
}
module.exports = { DepartmentManager, departmentManagerFields };
