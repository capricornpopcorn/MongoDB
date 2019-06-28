const express = require('express');
const router = express.Router();
let items = require('../items.json');
const mongoose = require('mongoose');

// This edits the JSON file
function myFile() {
  mongoose.writeFile('../items.json', JSON.stringify(items, null, '\t'), 'utf8',
      function(err) {
        if (err) throw err;
      });
}

/* GET user page. */
router.get('/user', function (req, res, next) {
  res.render('admin/user', { title: 'Dukaan', user: 'active' });
});
/* GET item page. */
router.get('/item', function (req, res, next) {
  res.render('admin/item', { title: 'Dukaan', item: 'active' , items:items});
});

// Add an item in json file
router.post('/item', function(req, res) {
  items = items.filter(function(item) {
    return item.sku !== req.body.sku;
  });
  items.push(req.body);
      myFile();
      res.redirect('/admin/item');
    });

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