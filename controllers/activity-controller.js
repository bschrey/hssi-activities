const {mongoose} = require('../db/mongoose');
const Activity = require('../models/activity.js');

exports.create = (req, res) => {
    const _animal = req.body.animal || {};
    const _person = req.body.person || {};
    const _facility = req.body.facility || {};

    const activity = new Activity({
        type: req.body.type,
        date: req.body.date,
        enddate: req.body.enddate,
        animal: {
            id: _animal.id,
            name: _animal.name,
            type: _animal.type
        },
        person: {
            id: _person.id,
            last: _person.last,
            first: _person.first
        },
        facility: {
            id: _facility.id,
            name: _facility.name
        }
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
    const _animal = req.body.animal || {};
    const _person = req.body.person || {};
    const _facility = req.body.facility || {};

    Activity.findByIdAndUpdate(req.params.activityId, {
        type: req.body.type,
        date: req.body.date,
        enddate: req.body.enddate,
        animal: {
            id: _animal.id,
            name: _animal.name,
            type: _animal.type
        },
        person: {
            id: _person.id,
            last: _person.last,
            first: _person.first
        },
        facility: {
            id: _facility.id,
            name: _facility.name
        }
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
