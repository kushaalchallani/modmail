const { model, Schema } = require('mongoose');

const settingsSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  settings: {
    type: Object,
    required: false,
    default: {},
  },
});

module.exports = model('settings', settingsSchema);
