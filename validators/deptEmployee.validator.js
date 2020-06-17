const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { DepartmentEmployee } = require("../models/departmentEmployee");

const AnEmployeeCantBeInMultipleDepartmentsAtTheSameTime = {
  validate: async function (typeName, originalObject, materializeObject) {
    const fromDateDeptEmployee = materializeObject.fromDate;
    const toDateDeptEmployee = materializeObject.toDate;

    const deptEmployeeFinded = await DepartmentEmployee.findOne({
      $and: [
        { employeeId: materializeObject.employeeId },
        {
          $or: [
            {
              $and: [
                { fromDate: { $lt: fromDateDeptEmployee } },
                { toDate: { $gt: fromDateDeptEmployee } },
              ],
            },
            {
              $and: [
                { fromDate: { $lt: toDateDeptEmployee } },
                { toDate: { $gt: toDateDeptEmployee } },
              ],
            },
          ],
        },
      ],
    });
    if (deptEmployeeFinded) {
      throw new CantBeAnEmployeeInMultipleDepartmentsAtTheSameTimeError(
        typeName
      );
    }
  },
};

class CantBeAnEmployeeInMultipleDepartmentsAtTheSameTimeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "there cannot be an employee in multiple departments at the same time.",
      "CantBeAnEmployeeInMultipleDepartmentsAtTheSameTimeError"
    );
  }
}

module.exports = {
  AnEmployeeCantBeInMultipleDepartmentsAtTheSameTime,
};
