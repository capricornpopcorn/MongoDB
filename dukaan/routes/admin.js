const express = require('express');
const router = express.Router();
const Items = require('./item-model');

// // // Create and Save a new Model
// Items.create = (req, res) => {
// // // Validate request
// // if(!req.body.content) {
// //     return res.status(400).send({
// //         message: "Model content can not be empty"
// //     });
// // };


// Retrieve and return all Models from the database.
Items.findAll = (req, res) => {
    Model.find()
    .then(Models => {
        res.send(Models);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving models."
        });
    });
};

// Find a single model with a modelId
Items.findOne = (req, res) => {
    Model.findById(req.params.modelId)
    .then(model => {
        if(!model) {
            return res.status(404).send({
                message: "Model not found with id " + req.params.modelId
            });            
        }
        res.send(model);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Model not found with id " + req.params.modelId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving model with id " + req.params.modelId
        });
    });
};

// Update a model identified by the modelId in the request
Items.update = (req, res) => {
 // Validate Request
 if(!req.body.content) {
    return res.status(400).send({
        message: "Model content can not be empty"
    });
}

// Find model and update it with the request body
Model.findByIdAndUpdate(req.params.modelId, {
    title: req.body.title || "Untitled Model",
    content: req.body.content
}, {new: true})
.then(model => {
    if(!model) {
        return res.status(404).send({
            message: "Model not found with id " + req.params.modelId
        });
    }
    res.send(model);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Model not found with id " + req.params.modelId
        });                
    }
    return res.status(500).send({
        message: "Error updating model with id " + req.params.modelId
    });
});

};

// Delete a model with the specified modelId in the request
Items.delete = (req, res) => {
    Model.findByIdAndRemove(req.params.modelId)
    .then(model => {
        if(!model) {
            return res.status(404).send({
                message: "Model not found with id " + req.params.modelId
            });
        }
        res.send({message: "Model deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Model not found with id " + req.params.modelId
            });                
        }
        return res.status(500).send({
            message: "Could not delete model with id " + req.params.modelId
        });
    });
};


/* GET user page. */
router.get('/user', function (req, res, next) {
  res.render('admin/user', { title: 'Dukaan', user: 'active' });
});
/* GET item page. */

router.get('/item', function (req, res, next) {
  res.render('admin/item', { title: 'Dukaan', item: 'active' , items:Items});
});

// Add an item in json file
// Create an Item and Save
const item = new Items({
    name: req.body.name || "Untitled Item", 
    sku: req.body.sku,
    price: req.body.price
});
item.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Model."
    });
});
// router.post('/item', function(req, res) {
//   items = items.filter(function(item) {
//     return item.sku !== req.body.sku;
//   });
//   items.push(req.body);
//       myFile();
//       res.redirect('/admin/item');
//     });

// Deletes the item     
router.delete('/item/delete/:num', function(req, res) {
  Items = Items.filter(function(item) {
        return item.sku !== req.params.num;
      });
      myFile();
      res.redirect('item');
    });    

/* GET orders page. */
router.get('/orders', function (req, res, next) {
  res.render('admin/orders', { title: 'Dukaan', orders: 'active' });
});

module.exports = router;