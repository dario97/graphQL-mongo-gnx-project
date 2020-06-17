const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const moment = require("moment");
const { Title } = require("../models/title");

const ValidateTitleDates = {
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
                { fromDate: { $lt: fromDateTitle } },
                { toDate: { $gt: fromDateTitle } },
              ],
            },
            {
              $and: [
                { fromDate: { $lt: toDateTitle } },
                { toDate: { $gt: toDateTitle } },
              ],
            },
          ],
        },
      ],
    });
    if (titleFinded) {
      throw new TitleError(typeName);
    }
  },
};

class TitleError extends GNXError {
  constructor(typeName) {
    super(typeName, "TitleError", "TitleError");
  }
}

module.exports = { ValidateTitleDates };
