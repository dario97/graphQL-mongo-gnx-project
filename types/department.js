const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
} = require("graphql");
const gnx = require("@simtlix/gnx");

const {
  CantRepeatDepartmentName,
  CantDeleteDepartmentWithEmployees,
} = require("../validators/department.validator");

const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQlObjectType");

const { Department } = require("../models/department");

const DepartmentType = new GraphQLObjectType({
  name: "DepartmentType",
  description: "Represent departments",
  extensions: {
    validations: {
      CREATE: [CantRepeatDepartmentName],
      UPDATE: [CantRepeatDepartmentName],
      DELETE: [CantDeleteDepartmentWithEmployees],
    },
  },
  fields: () =>
    Object.assign(AuditableObjectFields, {
      id: { type: GraphQLID },
      departmentName: { type: GraphQLString },
    }),
});

gnx.connect(Department, DepartmentType, "department", "departments");
module.exports = DepartmentType;
