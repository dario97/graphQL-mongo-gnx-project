const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQlObjectType");

const { Employee } = require("../models/employee");
const { Department } = require("../models/department");
const { DepartmentManager } = require("../models/departmentManager");
const EmployeeType = require("./employee");
const DepartmentType = require("./department");

const { GraphQLObjectType, GraphQLID } = graphql;
const { GraphQLDate } = require("graphql-iso-date");

const {
  ValidateDates,
  EmployeeMustBeExists,
  DepartmentMustBeExists,
} = require("../validators/common.validators");
const {
  AMangerCantBeManagerOfMultipleDepartmentsAtTheSameTime,
} = require("../validators/deptManager.validator");

const DepartmentManagerType = new GraphQLObjectType({
  name: "DepartmentDepartmentType",
  description: "Represent the relation between a department and his manager",
  extensions: {
    validations: {
      CREATE: [
        ValidateDates,
        EmployeeMustBeExists,
        DepartmentMustBeExists,
        AMangerCantBeManagerOfMultipleDepartmentsAtTheSameTime,
      ],
      UPDATE: [
        ValidateDates,
        EmployeeMustBeExists,
        DepartmentMustBeExists,
        AMangerCantBeManagerOfMultipleDepartmentsAtTheSameTime,
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
  DepartmentManager,
  DepartmentManagerType,
  "departmentManager",
  "dempartmentManagers"
);

module.exports = DepartmentManagerType;
