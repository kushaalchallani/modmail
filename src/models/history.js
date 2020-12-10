const { model, Schema } = require('mongoose');

const historySchema = new Schema({
  guild: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  history: {
    type: Object,
    required: true,
    default: new Object,
  },
});

module.exports = model('history', historySchema);
