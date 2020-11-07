const express = require('express');

const router = express.Router();

const Project = require("../helpers/projectModel.js")
const Action = require("../helpers/actionModel.js")


router.get('/', (req, res) => {
    Project.get()
        .then(pr => {
            res.status(200).json({
                message: "here is a list of all projects",
                project_list: pr
            })
        })
        .catch(err => {
            res.status(500).json({ message: "my bad! I can't 'get' all projects."})
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Project.get(id)
        .then(pr => {
            res.status(200).json({
                message: `here is the project with the id of: ${id}`,
                Project: pr
            })
        })
        .catch(err => {
            res.status(500).json({ message: `our bad! cant 'get'project by the id of ${id} :( ` })
        })
})

router.get('/:id/projectactions', (req, res) => {
    const id = req.params.id;
    Project.getProjectActions(id)
    .then(act => {
        res.status(200).json({
            message: `here are the actions for your project`,
            project_actions: act
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "cant get actions for this project"
        })
    })
})

router.post('/', validateProject, (req, res) => {
    const body = req.body;
    Project.insert(body)
        .then(pr => {
            res.status(201).json({
                message: "successfully created project",
                project_info: pr
            })
        })
        .catch(err => {
            res.status(500).json({ message: "project not created"})
        })
})

router.post('/:id/actions', validateAction, (req,res) => {
    const body = req.body;
    Posts.insert(body)
      .then(act => {
        res.status(200).json({
          message: "successfully created action",
          new_action: act
        })
      })
      .catch(err => {
        res.status(500).json({ message: "our bad! action not created"})
      })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Project.update(id, body)
    .then(upd => {
        res.status(200).json({
            message: "update successful!",
            update: upd
        })
    })
    .catch(err => {
        res.status(500).json({ message: "project not updated"})
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Project.remove(id)
    .then(del => {
        res.status(200).json({
            message: "successfully deleted project"
        })
    })
    .catch(err => {
        res.status(500).json({ message: "project not created"})
    })
})

function validateProject(req, res, next) {
    // do your magic!
    const body = req.body
    if (body) {
      if (body.name && body.description) {
        const bodyMin = 4
        if (body.name.length = bodyMin) {
          next();
        } else {
          res.status(400).json({ message: `project name must be at least ${bodyMin} letters` })
        }
      } else {
        res.status(400).json({ message: "missing required name field" })
      }
    } else {
      res.status(400).json({ message: "missing name or description" })
    }
  }

  function validateAction(req, res, next) {
    // do your magic!
    const body = req.body
    if (body) {
      if (body.description && body.notes) {
        const bodyMin = 4
        if (body.description.length = bodyMin) {
          next();
        } else {
          res.status(400).json({ message: `project name must be at least ${bodyMin} letters` })
        }
      } else {
        res.status(400).json({ message: "missing required name field" })
      }
    } else {
      res.status(400).json({ message: "missing name or description" })
    }
  }



module.exports = router;