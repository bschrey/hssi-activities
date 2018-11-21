module.exports = (app) => {
    
    const activities = require('../controllers/activity-controller.js');

    app.post('/v1/activities', activities.create);

    app.get('/v1/activities', activities.findAll);

    app.get('/v1/activities/:activityId', activities.findOne);

    app.put('/v1/activities/:activityId', activities.update);

    app.delete('/v1/activities/:activityId', activities.delete);

}