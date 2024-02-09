const mongoose = require("mongoose");

const BulkDataSchema = mongoose.Schema(
  {
    data: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const BulkData = mongoose.model("BulkData", BulkDataSchema);

module.exports = BulkData;
