const mongoose = require("mongoose");

const BulkDataSchema1 = mongoose.Schema(
  {
    data: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const BulkData1 = mongoose.model("BulkData2", BulkDataSchema1);

module.exports = BulkData1;
