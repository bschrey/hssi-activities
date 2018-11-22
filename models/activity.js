const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
	id: String,
	name: String,
	type: String
}, {
	id: false,
	_id: false
});

const PersonSchema = mongoose.Schema({
	id: String,
	first: String,
	last: String
}, {
	id: false,
	_id: false
});

const FacilitySchema = mongoose.Schema({
	id: String,
	name: String
}, {
	id: false,
	_id: false
});

const ActivitySchema = mongoose.Schema({
    type: {
    	type: String,
    	required: true,
    	minlength: 1,
    	trim: true
    },
    date: {
    	type: Date,
    	default: Date.now
    },
    enddate: {
    	type: Date,
    	default: null
    },
    animal: AnimalSchema,
    person: PersonSchema,
    facility: FacilitySchema
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', ActivitySchema);