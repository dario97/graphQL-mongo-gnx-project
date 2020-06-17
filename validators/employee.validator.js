const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
var moment = require("moment");

const { Employee } = require("../models/employee");
const { Salary } = require("../models/salary");
const { Title } = require("../models/title");
const { DepartmentEmployee } = require("../models/departmentEmployee");
const CantRepeatDNI = {
  validate: async function (typeName, originalObject, materializeObject) {
    const employeeFinded = await Employee.findOne({
      dni: materializeObject.dni,
    });
    if (employeeFinded) {
      throw new CantExistsEmployeesWithSameDniError(typeName);
    }
  },
};

const ValidateAge = {
  validate: function (typeName, originalObject, materializeObject) {
    const birthDate = materializeObject.birthDate;
    const ageInYears = moment().diff(new Date(birthDate), "years");
    if (ageInYears < 18) {
      throw new InvalidAgeError(typeName);
    }
  },
};

const CantDeleteEmployeeWithSalaryAssigned = {
  validate: async function (typeName, originalObject, materializeObject) {
    const salaryFinded = await Salary.findOne({ employeeId: originalObject });
    if (salaryFinded) {
      throw new CantDeleteEmployeeWithSalaryAssignedError(typeName);
    }
  },
};

const CantDeleteEmployeeWithTitleAssigned = {
  validate: async function (typeName, originalObject, materializeObject) {
    const titleFinded = await Title.findOne({ employeeId: originalObject });
    if (titleFinded) {
      throw new CantDeleteEmployeeWithTitleAssignedError(typeName);
    }
  },
};

const CantDeleteEmployeeWithDepartmentAssigned = {
  validate: async function (typeName, originalObject, materializeObject) {
    const departmentFinded = await DepartmentEmployee.findOne({
      employeeId: originalObject,
    });
    if (departmentFinded) {
      throw new CantDeleteEmployeeWithDepartmentAssignedError(typeName);
    }
  },
};

class CantExistsEmployeesWithSameDniError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Already exist an employee with the same DNI",
      "CantExistEmployeesWithSameDniError"
    );
  }
}

class InvalidAgeError extends GNXError {
  constructor(typeName) {
    super(typeName, "The employee can't be a minor", "InvalidAgeError");
  }
}

class CantDeleteEmployeeWithSalaryAssignedError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Can't delete an employee with title assigned",
      "CantDeleteEmployeeWithSalaryAssignedError"
    );
  }
}

class CantDeleteEmployeeWithTitleAssignedError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Can't delete an employee with salary assigned",
      "CantDeleteEmployeeWithTitleAssignedError"
    );
  }
}

class CantDeleteEmployeeWithDepartmentAssignedError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Can't delete an employee with department assigned",
      "CantDeleteEmployeeWithDepartmentAssignedError"
    );
  }
}
module.exports = {
  CantRepeatDNI,
  ValidateAge,
  CantDeleteEmployeeWithSalaryAssigned,
  CantDeleteEmployeeWithTitleAssigned,
  CantDeleteEmployeeWithDepartmentAssigned,
};
