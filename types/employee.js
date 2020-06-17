const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQlObjectType");

const { Employee } = require("../models/employee");

const graphqlIsoDate = require("graphql-iso-date");
const { GraphQLDate } = graphqlIsoDate;

const { GraphQLString, GraphQLID, GraphQLObjectType, GraphQLInt } = graphql;

const {
  CantRepeatDNI,
  ValidateAge,
  CantDeleteEmployeeWithSalaryAssigned,
  CantDeleteEmployeeWithTitleAssigned,
  CantDeleteEmployeeWithDepartmentAssigned,
} = require("../validators/employee.validator");

const SexTypeEnum = require("./enums/sex.enum");

const EmployeeType = new GraphQLObjectType({
  name: "EmployeeType",
  description: "Represent employees",
  extensions: {
    validations: {
      CREATE: [CantRepeatDNI, ValidateAge],
      UPDATE: [CantRepeatDNI, ValidateAge],
      DELETE: [
        CantDeleteEmployeeWithSalaryAssigned,
        CantDeleteEmployeeWithTitleAssigned,
        CantDeleteEmployeeWithDepartmentAssigned,
      ],
    },
  },
  fields: () =>
    Object.assign(AuditableObjectFields, {
      id: { type: GraphQLID },
      dni: { type: GraphQLInt },
      birthDate: { type: GraphQLDate },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      gender: { type: SexTypeEnum },
      hireDate: { type: GraphQLDate },
    }),
});

gnx.connect(Employee, EmployeeType, "employee", "employees");

module.exports = EmployeeType;
