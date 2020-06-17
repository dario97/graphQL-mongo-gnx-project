const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
} = require("graphql");
const gnx = require("@simtlix/gnx");

const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQlObjectType");
const { GraphQLDate } = require("graphql-iso-date");
const EmployeeType = require("./employee");
const { Employee } = require("../models/employee");
const { Title } = require("../models/title");

const { ValidateDates } = require("../validators/common.validators");
const {
  CantBeTitlesOfAnEmployeeInTheSamePeriodOfTime,
} = require("../validators/title.validator");

const TitleType = new GraphQLObjectType({
  name: "TitleType",
  description: "Represent titles",
  extensions: {
    validations: {
      CREATE: [ValidateDates, CantBeTitlesOfAnEmployeeInTheSamePeriodOfTime],
      UPDATE: [ValidateDates, CantBeTitlesOfAnEmployeeInTheSamePeriodOfTime],
    },
  },
  fields: () =>
    Object.assign({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
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

gnx.connect(Title, TitleType, "title", "titles");
module.exports = TitleType;
