const express = require('express');
const router = express.Router();
const models = [];
const Items = require('./item-model');

// // // Create and Save a new Model
// Items.create = (req, res) => {
//   // Validate request
//   if(!req.body.content) {
//       return res.status(400).send({
//           message: "Model content can not be empty"
//       });
//   };
//   // Create a Model
//   const model = new Model({
//       name: req.body.name || "Untitled Model", 
//       sku: req.body.sku
//   });
  
//   // Save Model in the database
//   model.save()
//   .then(data => {
//       res.send(data);
//   }).catch(err => {
//       res.status(500).send({
//           message: err.message || "Some error occurred while creating the Model."
//       });
//   });
//   };
  
//   // Retrieve and return all Models from the database.
//   Items.findAll = (req, res) => {
//       Model.find()
//       .then(Models => {
//           res.send(Models);
//       }).catch(err => {
//           res.status(500).send({
//               message: err.message || "Some error occurred while retrieving models."
//           });
//       });
//   };
  
//   // Find a single model with a modelId
//   Items.findOne = (req, res) => {
//       Model.findById(req.params.modelId)
//       .then(model => {
//           if(!model) {
//               return res.status(404).send({
//                   message: "Model not found with id " + req.params.modelId
//               });            
//           }
//           res.send(model);
//       }).catch(err => {
//           if(err.kind === 'ObjectId') {
//               return res.status(404).send({
//                   message: "Model not found with id " + req.params.modelId
//               });                
//           }
//           return res.status(500).send({
//               message: "Error retrieving model with id " + req.params.modelId
//           });
//       });
//   };
  
//   // Update a model identified by the modelId in the request
//   Items.update = (req, res) => {
//    // Validate Request
//    if(!req.body.content) {
//       return res.status(400).send({
//           message: "Model content can not be empty"
//       });
//   }
  
//   // Find model and update it with the request body
//   Model.findByIdAndUpdate(req.params.modelId, {
//       title: req.body.title || "Untitled Model",
//       content: req.body.content
//   }, {new: true})
//   .then(model => {
//       if(!model) {
//           return res.status(404).send({
//               message: "Model not found with id " + req.params.modelId
//           });
//       }
//       res.send(model);
//   }).catch(err => {
//       if(err.kind === 'ObjectId') {
//           return res.status(404).send({
//               message: "Model not found with id " + req.params.modelId
//           });                
//       }
//       return res.status(500).send({
//           message: "Error updating model with id " + req.params.modelId
//       });
//   });
  
//   };
  
//   // Delete a model with the specified modelId in the request
//   Items.delete = (req, res) => {
//       Model.findByIdAndRemove(req.params.modelId)
//       .then(model => {
//           if(!model) {
//               return res.status(404).send({
//                   message: "Model not found with id " + req.params.modelId
//               });
//           }
//           res.send({message: "Model deleted successfully!"});
//       }).catch(err => {
//           if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//               return res.status(404).send({
//                   message: "Model not found with id " + req.params.modelId
//               });                
//           }
//           return res.status(500).send({
//               message: "Could not delete model with id " + req.params.modelId
//           });
//       });
//   };
  
//   const item = new Items(
//     {
//         name: "Pen",
//         sku: 90078601,
//         qty: 10,
//         price: 250,
//         status: "Shipped"
//       }
// );
// item.save().then(()=>{
//   console.log('Save ho gaya');
// });

/* GET shop page. */
router.get('/', function (req, res, next) {
  Items.find().then(models => {
      res.render('shop', { title: 'Dukaan', shop:'active', items:models });
  }).catch(err => {
      console.log( err.message || "Some error occurred while retrieving notes.");
  });
  
});

module.exports = router;
