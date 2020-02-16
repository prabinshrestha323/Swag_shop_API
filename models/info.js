const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infoSchema = new Schema({
  name: {
    type: String
  },
  address: {
    type: String
  }
});

module.export = mongoose.model("Info", infoSchema);
