const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const moment = require("moment");

const ValidateDates = {
  validate: function (typeName, originalObject, materializeObject) {
    const fromDate = materializeObject.fromDate;
    const toDate = materializeObject.toDate;
    if (toDate && moment(toDate).isBefore(fromDate)) {
      throw new ToDateCantBeSmallerThanFromDateError(typeName);
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

module.exports = { ValidateDates };
