var Component = require('./Component.js').Component
var SpringSpecification = require('../interface/SpringSpecification.js').SpringSpecification
var Point = require('../geometry/Point.js').Point
var Spindle = require('./Spindle.js').Spindle;

module.exports.Spring = Spring

function Spring() {
	var spring = new Component();

	const DEFAULT_THICKNESS = 1.5;
	const DEFAULT_TURN = 5;
	const DEFAULT_MAX_RADIUS = 15;
	const DEFAULT_START_RADIUS = 5;
	const DEFAULT_OUTER_CYLINDER_RADIUS = 6;
	const DEFAULT_OUTER_CYLINDER_HEIGHT = 7;
	const DEFAULT_INNER_CYLINDER_RADIUS = 4;
	const DEFAULT_INNER_CYLINDER_HEIGHT = 13;
	const DEFAULT_CENTRE_HOLE_RADIUS = 1;
	const DEFAULT_ROUNDED_CUBE_HEIGHT = 6;
	const DEFAULT_ROUNDED_CUBE_LENGTH = 4;
	const DEFAULT_ROUNDED_CUBE_WIDTH = 2;
	const DEFAULT_HEIGHT = 13;

	var thickness = DEFAULT_THICKNESS;
	var turn = DEFAULT_TURN;
	var maxRadius = DEFAULT_MAX_RADIUS;
	var startRadius = DEFAULT_START_RADIUS;
	var outerCylinderRadius = DEFAULT_OUTER_CYLINDER_RADIUS;
	var outerCylinderHeight = DEFAULT_OUTER_CYLINDER_HEIGHT;
	var innerCylinderRadius = DEFAULT_INNER_CYLINDER_RADIUS;
	var innerCylinderHeight = DEFAULT_INNER_CYLINDER_HEIGHT;
	var centreHoleRadius = DEFAULT_CENTRE_HOLE_RADIUS;
	var roundedCubeHeight = DEFAULT_ROUNDED_CUBE_HEIGHT;
	var roundedCubeLength = DEFAULT_ROUNDED_CUBE_LENGTH;
	var roundedCubeWidth = DEFAULT_ROUNDED_CUBE_WIDTH;
	var height = DEFAULT_HEIGHT;
	spring.setCentre(0, 0, 0);

	spring.toSpecification = function() {
		return new SpringSpecification(spring);
	}

	spring.getTypeName = function() {
		return "Spring";
	}

	spring.getThickness = function() {
		return thickness;
	}

	spring.getTurn = function() {
		return turn;
	}

	spring.getMaxRadius = function() {
		return maxRadius;
	}

	spring.getStartRadius = function() {
		return startRadius;
	}

	spring.getOuterCylinderRadius = function() {
		return outerCylinderRadius;
	}

	spring.getOuterCylinderHeight = function() {
		return outerCylinderHeight;
	}

	spring.getInnerCylinderRadius = function() {
		return innerCylinderRadius;
	}

	spring.getInnerCylinderHeight = function() {
		return innerCylinderHeight;
	}

	spring.getCentreHoleRadius = function() {
		return centreHoleRadius;
	}

	spring.getRoundedCubeHeight = function() {
		return roundedCubeHeight;
	}

	spring.getRoundedCubeLength = function() {
		return roundedCubeLength;
	}

	spring.getRoundedCubeWidth = function() {
		return roundedCubeWidth;
	}

	spring.getHeight = function() {
		return height;
	}

	spring.setThickness = function(newThickness) {
		thickness = newThickness;
	}

	spring.setTurn = function(newTurn) {
		turn = newTurn;
	}

	spring.setMaxRadius = function(newMaxRadius) {
		maxRadius = newMaxRadius;
	}

	spring.setStartRadius = function(newStartRadius) {
		startRadius = newStartRadius;
	}

	spring.setOuterCylinderRadius = function(newOuterCylinderRadius) {
		outerCylinderRadius = newOuterCylinderRadius;
	}

	spring.setOuterCylinderHeight = function(newOuterCylinderHeight) {
		outerCylinderHeight = newOuterCylinderHeight;
	}

	spring.setInnerCylinderRadius = function(newInnerCylinderRadius) {
		innerCylinderRadius = newInnerCylinderRadius;
	}

	spring.setInnerCylinderHeight = function(newInnerCylinderHeight) {
		innerCylinderHeight = newInnerCylinderHeight;
	}

	spring.setCentreHoleRadius = function(newCentreHoleRadius) {
		centreHoleRadius = newCentreHoleRadius;
	}

	spring.setRoundedCubeHeight = function(newRoundedCubeHeight) {
		roundedCubeHeight = newRoundedCubeHeight;
	}

	spring.setRoundedCubeLength = function(newRoundedCubeLength) {
		roundedCubeLength = newRoundedCubeLength;
	}

	spring.setRoundedCubeWidth = function(newRoundedCubeWidth) {
		roundedCubeWidth = newRoundedCubeWidth;
	}

	spring.setHeight = function(newHeight) {
		height = newHeight;
	}

	spring.placeWith = function(otherComponent) {
		if (otherComponent.getTypeName() != 'Anchor')
			throw new Error("Spring can only place with an anchor");
		var centre = spring.getCentre();
		var connectP = spring.getConnectPoint();
		var otherConnectP = otherComponent.getConnectPoint();
		var newX = otherConnectP.getX().getValue() - connectP.getX().getValue();
		var newY = otherConnectP.getY().getValue() - connectP.getY().getValue();
		var newZ = otherConnectP.getZ().getValue() - connectP.getZ().getValue();
		/*
		console.log(otherConnectP.getX().getValue());
		console.log(otherConnectP.getY().getValue());
		console.log(otherConnectP.getZ().getValue());
		console.log('new x: ' + newX + '\tnew y: ' + newY + '\tnew z: ' + newZ);
		*/
		spring.setCentre(newX, newY, newZ);
	}

	spring.getConnectPoint = function() {
		var point = new Point();
		var centre = spring.getCentre();
		var x = centre.getX().getValue();
		var y = centre.getY().getValue() - innerCylinderRadius
				- roundedCubeLength + 1;
		var z = centre.getZ().getValue() + height
				- (roundedCubeHeight + thickness) / 2;
		point.setAt(x, y, z);
		return point;
	}
	
	spring.getSpindle = function() { 
		var spindle = new Spindle(height, centreHoleRadius);
		var centre = spring.getCentre();
		spindle.setCentre(centre);
		return spindle;
	}
	
	return spring;
}
