const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");
const gnx = require("@simtlix/gnx");

const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQlObjectType");
const { GraphQLDate } = require("graphql-iso-date");
const EmployeeType = require("./employee");
const { Employee } = require("../models/employee");
const { Salary } = require("../models/salary");

const { ValidateDates } = require("../validators/common.validators");

const SalaryType = new GraphQLObjectType({
  name: "SalaryType",
  description: "Represent salaries",
  extensions: {
    validations: {
      CREATE: [ValidateDates],
      UPDATE: [ValidateDates],
    },
  },
  fields: () =>
    Object.assign(AuditableObjectFields, {
      id: { type: GraphQLID },
      salary: { type: GraphQLInt },
      fromDate: { type: GraphQLDate },
      toDate: { type: GraphQLDate },
      employee: {
        type: EmployeeType,
        extensions: {
          relation: {
            connectionField: "employeeId",
          },
        },
        resolve(parent, args) {
          return Employee.findById(parent.employeeId);
        },
      },
    }),
});

gnx.connect(Salary, SalaryType, "salary", "salaries");
module.exports = SalaryType;
