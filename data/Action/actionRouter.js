const { json } = require('express');
const express = require('express');

const router = express.Router();

const Action = require("../helpers/actionModel.js")

router.get('/', (req, res) => {
    Action.get()
        .then(act => {
            res.status(200).json({
                message: "here are all the actions",
                action_list: act
            })
        })
        .catch(err => {
            res.status(500).json({ message: "our bad! cant 'get' actions."})
          })
})

router.put('/:id', (req, res) => {
    // do your magic!
    const id = req.params.id;
    const body = req.body;
    Action.update(id, body)
    .then(act => {
      req.status(200).json ({
        message: "You updated this action",
        action_Updated: act
      })
    })
    .catch(err => {
      res.status(500).json({ message: "Our bad! Can't update!"})
    })
  
  });


module.exports = router;
