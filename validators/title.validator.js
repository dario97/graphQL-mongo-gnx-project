const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Title } = require("../models/title");

const CantBeTitlesOfAnEmployeeInTheSamePeriodOfTime = {
  validate: async function (typeName, originalObject, materializeObject) {
    const fromDateTitle = materializeObject.fromDate;
    const toDateTitle = materializeObject.toDate;

    const titleFinded = await Title.findOne({
      $and: [
        { employeeId: materializeObject.employeeId },
        {
          $or: [
            {
              $and: [
                { fromDate: { $lte: fromDateTitle } },
                { toDate: { $gte: fromDateTitle } },
              ],
            },
            {
              $and: [
                { fromDate: { $lte: toDateTitle } },
                { toDate: { $gte: toDateTitle } },
              ],
            },
          ],
        },
      ],
    });

    if (titleFinded) {
      throw new CantBeTitlesOfAnEmployeeInTheSamePeriodOfTimeError(typeName);
    }
  },
};

class CantBeTitlesOfAnEmployeeInTheSamePeriodOfTimeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "there are cannot be titles of the same employee in the same period of time.",
      "CantBeTitlesOfAnEmployeeInTheSamePeriodOfTimeError"
    );
  }
}

module.exports = { CantBeTitlesOfAnEmployeeInTheSamePeriodOfTime };
