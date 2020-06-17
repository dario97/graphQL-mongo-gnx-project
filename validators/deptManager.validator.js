const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { DepartmentManager } = require("../models/departmentManager");

const AMangerCantBeManagerOfMultipleDepartmentsAtTheSameTime = {
  validate: async function (typeName, originalObject, materializeObject) {
    const fromDateDeptManager = materializeObject.fromDate;
    const toDateDeptManager = materializeObject.toDate;

    const deptManagerFinded = await DepartmentManager.findOne({
      $and: [
        { employeeId: materializeObject.employeeId },
        {
          $or: [
            {
              $and: [
                { fromDate: { $lt: fromDateDeptManager } },
                { toDate: { $gt: fromDateDeptManager } },
              ],
            },
            {
              $and: [
                { fromDate: { $lt: toDateDeptManager } },
                { toDate: { $gt: toDateDeptManager } },
              ],
            },
          ],
        },
      ],
    });
    if (deptManagerFinded) {
      throw new AMangerCantBeManagerOfMultipleDepartmentsAtTheSameTimeError(
        typeName
      );
    }
  },
};

class AMangerCantBeManagerOfMultipleDepartmentsAtTheSameTimeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "A Manger Can't Be Manager Of Multiple Departments At The Same Time",
      "AMangerCantBeManagerOfMultipleDepartmentsAtTheSameTimeError"
    );
  }
}

module.exports = {
  AMangerCantBeManagerOfMultipleDepartmentsAtTheSameTime,
};
