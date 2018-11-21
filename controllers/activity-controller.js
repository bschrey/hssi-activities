const {mongoose} = require('../db/mongoose');
const Activity = require('../models/activity.js');

exports.create = (req, res) => {
    const activity = new Activity({
        name: req.body.name || "Untitled activity", 
        address: req.body.address,
        type: req.body.type
    });

    activity.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the activity."
        });
    });
};

exports.findAll = (req, res) => {
    Activity.find()
    .then(activities => {
        res.send(activities);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving activities."
        });
    });
};

exports.findOne = (req, res) => {
    Activity.findById(req.params.activityId)
    .then(activity => {
        if(!activity) {
            return res.status(404).send({
                message: "Activity not found with id " + req.params.activityId
            });            
        }
        res.send(activity);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Activity not found with id " + req.params.activityId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving activity with id " + req.params.activityId
        });
    });
};

exports.update = (req, res) => {
    Activity.findByIdAndUpdate(req.params.activityId, {
        name: req.body.name || "Untitled activity", 
        address: req.body.address,
        type: req.body.type
    }, {new: true})
    .then(activity => {
        if(!activity) {
            return res.status(404).send({
                message: "Activity not found with id " + req.params.activityId
            });
        }
        res.send(activity);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Activity not found with id " + req.params.activityId
            });                
        }
        return res.status(500).send({
            message: "Error updating activity with id " + req.params.activityId
        });
    });
};

exports.delete = (req, res) => {
    Activity.findByIdAndRemove(req.params.activityId)
    .then(activity => {
        if(!activity) {
            return res.status(404).send({
                message: "Activity not found with id " + req.params.activityId
            });
        }
        res.send(activity);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Activity not found with id " + req.params.activityId
            });                
        }
        return res.status(500).send({
            message: "Could not delete activity with id " + req.params.activityId
        });
    });
};
