// Create the DataBase
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

// Read the DataBase
Cat.find({name :  'Zildjian'},(err,kitty)=>{
    if (err){
        console.log(err);
    } 
    console.log(kitty);
});
