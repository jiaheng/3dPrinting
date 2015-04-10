var Component = require('./Component.js').Component
var ConstrainableValue = require('../constraint/ConstrainableValue.js').ConstrainableValue
var BaseSpecification = require('../interface/BaseSpecification.js').BaseSpecification
var Circle = require('../geometry/Circle.js').Circle
var Line = require('../geometry/Line.js').Line

module.exports.Base = Base

function Base() {
	var base = Component()
	var height = new ConstrainableValue()
	var parts = []

	base.setCentre(0, 0, 0);
	
	base.getParts = function() {
		return parts
	}
	
	base.addPart = function(part) {
		parts.push(part)
	}

	base.getTypeName = function() {
		return "Base"
	}

	base.getHeight = function() {
		return height.getValue();
	}

	base.setHeight = function(h) {
		height.setValue(h)
	}

	base.getRadius = function() {
		return base.getBoundingShape().getRadius()
	}

	base.setRadius = function(r) {
		base.getBoundingShape().getRadius().setValue(r)
	}

	base.toSpecification = function() {
		return new BaseSpecification(base)
	}

	base.checkCollideWith = function(component) {}
	
	base.getBoundaryShapes = function() {
		return []
	}
	
	return base
}