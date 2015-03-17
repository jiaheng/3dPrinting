var Component = require('./Component.js').Component
var SpindleSpecification = require('../interface/SpindleSpecification.js').SpindleSpecification

module.exports.Spindle = Spindle

function Spindle(h, r) {
	
	var spindle = Component();
	var height;
	var radius;
	
	spindle.getHeight = function() {
		return height
	}

	spindle.getTypeName = function() {
		return "Spindle"
	}
	
	var checkHeight = function(h) {
		if (typeof h !== 'number' || isNaN(h))
			throw new Error('height must be a number');
	}
	
	var checkRadius = function(r) {
		if (typeof r !== 'number' || isNaN(r))
			throw new Error('radius must be a number');
	}
	
	spindle.setHeight = function(h) {
		checkHeight(h);
		height = h;
	}

	spindle.getRadius = function() {
		return radius;
	}

	spindle.setRadius = function(r) {
		checkRadius(r);
		radius = r;
	}

	spindle.toSpecification = function() {
		return new SpindleSpecification(spindle)
	}
	
	spindle.setHeight(h);
	spindle.setRadius(r);
	
	return spindle;
}
