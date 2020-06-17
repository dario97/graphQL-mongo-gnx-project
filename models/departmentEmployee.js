const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { GraphQLDate } = require("graphql-iso-date");

const departmentEmployeeFields = {
  employeeId: mongoose.Schema.Types.ObjectId,
  departmentId: mongoose.Schema.Types.ObjectId,
  fromDate: GraphQLDate,
  toDate: GraphQLDate,
};

const departmentEmployeeSchema = new Schema(departmentEmployeeFields);

const DepartmentEmployee = mongoose.model(
  "DepartmentEmployee",
  departmentEmployeeSchema
);
if (!DepartmentEmployee.collection.collection) {
  DepartmentEmployee.createCollection();
}
module.exports = { DepartmentEmployee, departmentEmployeeFields };
