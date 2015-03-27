var Component = require('./Component.js').Component
var SpindleSpecification = require('../interface/SpindleSpecification.js').SpindleSpecification

module.exports.Spindle = Spindle

function Spindle(h, r) {
	
	var spindle = Component();
	var height;
	var radius;
	
	spindle.setCentre(0, 0, 0);
	
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

	var checkParameter = function() {
		if(spindle.getHeight() <= 0)
			throw new Error('Height must be more than zero');
		if(spindle.getRadius() <= 0)
			throw new Error('Radius must be more than zero');
	}
	
	spindle.toSpecification = function() {
		checkParameter();
		return new SpindleSpecification(spindle)
	}

	spindle.setHeight(h);
	spindle.setRadius(r);
	
	return spindle;
}
