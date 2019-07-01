const mongoose = require('mongoose');

const Things = mongoose.Schema({
   id: Number,
  name: String,
  sku: Number,
  qty: Number,
  price: Number,
  status: String
},
 {
    timestamps: true
});

module.items = mongoose.model('Model', Things);

// const Cheeze = mongoose.model('Cheese', {
  
//   });
// const items = new Cheeze({ name:'Phone', sku: '1234', price: 25000 });
// items.save().then(() => console.log('meow'));