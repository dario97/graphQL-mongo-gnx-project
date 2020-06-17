const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const moment = require("moment");
const { Employee } = require("../models/employee");
const { Department } = require("../models/department");

const ValidateDates = {
  validate: function (typeName, originalObject, materializeObject) {
    const fromDate = materializeObject.fromDate;
    const toDate = materializeObject.toDate;
    if (toDate && moment(toDate).isBefore(fromDate)) {
      throw new ToDateCantBeSmallerThanFromDateError(typeName);
    }
  },
};

const EmployeeMustBeExists = {
  validate: async function (typeName, originalObject, materializeObject) {
    const exists = Employee.exists({ id: materializeObject.employeeId });
    if (!exists) {
      throw new EmployeeNotExistsError(typeName);
    }
  },
};

const DepartmentMustBeExists = {
  validate: async function (typeName, originalObject, materializeObject) {
    const exists = Department.exists({ id: materializeObject.departmentId });
    if (!exists) {
      throw new DepartmentNotExistsError(typeName);
    }
  },
};

class ToDateCantBeSmallerThanFromDateError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "To Date can't be smaller than From Date",
      "ToDateCantBeSmallerThanFromDateError"
    );
  }
}

class EmployeeNotExistsError extends GNXError {
  constructor(typeName) {
    super(typeName, "The employee not exists", "EmployeeNotExistsError");
  }
}

class DepartmentNotExistsError extends GNXError {
  constructor(typeName) {
    super(typeName, "The department not exists", "DepartmentNotExistsError");
  }
}

module.exports = {
  ValidateDates,
  EmployeeMustBeExists,
  DepartmentMustBeExists,
};
