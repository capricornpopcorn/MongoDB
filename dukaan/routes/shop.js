const express = require('express');
const router = express.Router();
// const fs = require('fs');
let items = require('../items.json');

// This rewrites the JSON file
function myFile() {
  fs.writeFile('items.json', JSON.stringify(items), 'utf8',
      function(err) {
        if (err) throw err;
      });
}

/* GET shop page. */
router.get('/', function (req, res, next) {
  res.render('shop', { title: 'Dukaan', shop:'active', items:items });
  // res.render(items);
});
 // router.post('/', function(req, res) {
    //   items.push(req.body);
    //   myFile();
    //   res.redirect('/');
    // });
module.exports = router;
