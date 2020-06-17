const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const { Department } = require("../models/department");
const { DepartmentEmployee } = require("../models/departmentEmployee");

const CantRepeatDepartmentName = {
  validate: async function (typeName, originalObject, materializeObject) {
    const departmentFinded = await Department.findOne({
      departmentName: materializeObject.departmentName,
    });
    if (departmentFinded && departmentFinded._id != materializeObject._id) {
      throw new CantCreateDepartmentWithNameUsedError(typeName);
    }
  },
};

const CantDeleteDepartmentWithEmployees = {
  validate: async function (typeName, originalObject, materializeObject) {
    const departmentFinded = await DepartmentEmployee.findOne({
      departmentId: originalObject,
    });
    if (departmentFinded) {
      throw new CantDeleteDepartmentWithEmployeesError(typeName);
    }
  },
};

class CantCreateDepartmentWithNameUsedError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Already exist a department with the same name",
      "CantCreateDepartmentWithNameUsedError"
    );
  }
}

class CantDeleteDepartmentWithEmployeesError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Can't delete a department with employees",
      "CantDeleteDepartmentWithEmployeesError"
    );
  }
}

module.exports = {
  CantRepeatDepartmentName,
  CantDeleteDepartmentWithEmployees,
};
