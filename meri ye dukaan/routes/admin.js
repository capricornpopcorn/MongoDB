const express = require('express');
const router = express.Router();
const items = require('item-model.js');

// // Create and Save a new Model
items.create = (req, res) => {
// Validate request
if(!req.body.content) {
    return res.status(400).send({
        message: "Model content can not be empty"
    });
};
// Create a Model
const model = new Model({
    name: req.body.name || "Untitled Model", 
    sku: req.body.sku
});

// Save Model in the database
model.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Model."
    });
});
};

// Retrieve and return all Models from the database.
items.findAll = (req, res) => {
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
items.findOne = (req, res) => {
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
items.update = (req, res) => {
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
items.delete = (req, res) => {
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








  // fetchFromAPI((err, data) => {
  //     if (err) throw err;
  //     let db = client.db('dukaan');
  //     const collection = db.collection('items');


    //   insertMongodb(collection, data.bpi)
    //     .then((result) => {
    //         console.log(`Successfully inserted ${result.length} documents into mongodb`);

    //         const options = {'sort': [['items', 'desc']]};
    //         collection.findOne({}, options, (err, doc) => {
    //             if(err) throw err;
    //             console.log(`MongoDB: The one month max value is ${doc.value} and it was reached on ${doc.date}`); 
    //             console.timeEnd('mongodb');
    //             client.close();
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         process.exit();
    //     });
    // });


// // This edits the JSON file
// function myFile() {
//   mongoose.writeFile('../items.json', JSON.stringify(items, null, '\t'), 'utf8',
//       function(err) {
//         if (err) throw err;
//       });
// }

/* GET user page. */
router.get('/user', function (req, res, next) {
  res.render('admin/user', { title: 'Dukaan', user: 'active' });
});
/* GET item page. */
router.get('/item', function (req, res, next) {
  res.render('admin/item', { title: 'Dukaan', item: 'active' , items:items});
});

// Add an item in json file

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
  items = items.filter(function(item) {
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