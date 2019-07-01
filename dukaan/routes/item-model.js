const mongoose = require('mongoose');

const Things = mongoose.Schema({
  name: String,
  sku: Number,
  qty: Number,
  price: Number,
  status: String
},
 {
    timestamps: true
});

module.exports = mongoose.model('Model', Things);
