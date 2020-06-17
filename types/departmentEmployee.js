const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQlObjectType");

const { Employee } = require("../models/employee");
const { Department } = require("../models/department");
const { DepartmentEmployee } = require("../models/departmentEmployee");
const EmployeeType = require("./employee");
const DepartmentType = require("./department");

const { GraphQLObjectType, GraphQLID } = graphql;
const { GraphQLDate } = require("graphql-iso-date");

const { ValidateDates } = require("../validators/common.validators");
const {
  AnEmployeeCantBeInMultipleDepartmentsAtTheSameTime,
} = require("../validators/deptEmployee.validator");

const DepartmentEmployeeType = new GraphQLObjectType({
  name: "DepartmentEmployeeType",
  description: "Represent the relation between an employee and a department",
  extensions: {
    validations: {
      CREATE: [
        ValidateDates,
        AnEmployeeCantBeInMultipleDepartmentsAtTheSameTime,
      ],
      UPDATE: [
        ValidateDates,
        AnEmployeeCantBeInMultipleDepartmentsAtTheSameTime,
      ],
    },
  },
  fields: () =>
    Object.assign(AuditableObjectFields, {
      id: { type: GraphQLID },
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
      department: {
        type: DepartmentType,
        extensions: {
          relation: {
            connectionField: "departmentId",
          },
        },
        resolve(parent, args) {
          return Department.findById(parent.departmentId);
        },
      },
    }),
});

gnx.connect(
  DepartmentEmployee,
  DepartmentEmployeeType,
  "departmentEmployee",
  "dempartmentEmployees"
);

module.exports = DepartmentEmployeeType;
