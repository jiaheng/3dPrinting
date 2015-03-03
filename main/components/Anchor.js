var Component = require('./Component.js').Component;
var AnchorSpecification = require('../interface/AnchorSpecification.js').AnchorSpecification;
var Point = require('../geometry/Point.js').Point;
var Spindle = require('./Spindle.js').Spindle;

module.exports.Anchor = Anchor

function Anchor() {
	var anchor = new Component();

	const DEFAULT_THICKNESS = 10;
	const DEFAULT_MAX_RADIUS = 50;
	const DEFAULT_CONNECT_WIDTH = 4;
	const DEFAULT_CONNECT_LENGTH = 4;
	const DEFAULT_CENTRE_HOLE_RADIUS = 3;
	const DEFAULT_CENTRE_RING_RADIUS = 12;
	const DEFAULT_HEIGHT = 10;
	const DEFAULT_HAND_WIDTH = 4; // CHANGE THE NAME
	const DEFAULT_CONNECTOR_LENGTH = 9;
	const DEFAULT_CONNECTOR_WIDTH = 8;
	
	var thickness = DEFAULT_THICKNESS;
	var maxRadius = DEFAULT_MAX_RADIUS;
	var connectWidth = DEFAULT_CONNECT_WIDTH;
	var connectLength = DEFAULT_CONNECT_LENGTH;
	var centreHoleRadius = DEFAULT_CENTRE_HOLE_RADIUS;
	var centreRingRadius = DEFAULT_CENTRE_RING_RADIUS;
	var height = DEFAULT_HEIGHT;
	var handWidth = DEFAULT_HAND_WIDTH; // CHANGE THE NAME
	var connectorLength = DEFAULT_CONNECTOR_LENGTH;
	var connectorWidth = DEFAULT_CONNECTOR_WIDTH;
	
	DEFAULT_MAX_RADIUS = 55;
	
	anchor.setCentre(0, 0, 0);

	anchor.toSpecification = function() {
		return new AnchorSpecification(anchor);
	}

	anchor.getTypeName = function() {
		return "Anchor";
	}

	anchor.getThickness = function() {
		return thickness;
	}

	anchor.getMaxRadius = function() {
		return maxRadius;
	}

	anchor.getConnectWidth = function() {
		return connectWidth;
	}

	anchor.getConnectLength = function() {
		return connectLength;
	}
	
	anchor.getCentreHoleRadius = function() {
		return centreHoleRadius;
	}

	anchor.getCentreRingRadius = function() {
		return centreRingRadius;
	}

	anchor.getHeight = function() {
		return height;
	}

	anchor.getHandWidth = function() {
		return handWidth;
	}

	anchor.getConnectorLength = function() {
		return connectorLength;
	}
	
	anchor.getConnectorWidth = function() {
		return connectorWidth;
	}
	
	anchor.setThickness = function(newThickness) {
		thickness = newThickness;
	}

	anchor.setMaxRadius = function(newMaxRadius) {
		maxRadius = newMaxRadius;
	}

	anchor.setConnectSize = function(w) {
		connectWidth = w;
	}

	anchor.setConnectLength = function(l) {
		connecLength = l;
	}
	
	anchor.setCentreHoleRadius = function(newCentreHoleRadius) {
		centreHoleRadius = newCentreHoleRadius;
	}

	anchor.setCentreRingRadius = function(newCentreRingRadius) {
		centreRingRadius = newCentreRingRadius;
	}

	anchor.setHeight = function(newHeight) {
		height = newHeight;
	}

	anchor.setHandWidth = function(newHandWidth) {
		handWidth = newHandWidth;
	}

	anchor.setConnectorLength = function(l) {
		connectorLength = l;
	}
	
	anchor.setConnectorWidth = function(w) {
		connectorWidth = w;
	}
	
	anchor.getConnectPoint = function() {
		var point = new Point();
		var centre = anchor.getCentre();
		var x = centre.getX().getValue();
		var y = centre.getY().getValue() + maxRadius + connectorLength;
		var z = centre.getZ().getValue() + height/2;
		point.setAt(x, y, z);
		return point;
	}
	
	anchor.placeWith = function(otherComponent) {
		if (otherComponent.getTypeName() != 'Spring')
			throw new Error("Anchor can only place with a spring");
		var centre = anchor.getCentre();
		var connectP = anchor.getConnectPoint();
		var otherConnectP = otherComponent.getConnectPoint();
		var newX = otherConnectP.getX().getValue() - connectP.getX().getValue();
		var newY = otherConnectP.getY().getValue() - connectP.getY().getValue();
		var newZ = otherConnectP.getZ().getValue() - connectP.getZ().getValue();
		anchor.setCentre(newX, newY, newZ);
	}
	
	anchor.getSpindle = function() {
		var spindle = new Spindle(height, centreHoleRadius);
		var centre = anchor.getCentre();
		var x = centre.getX().getValue();
		var y = centre.getY().getValue();
		var z = centre.getZ().getValue();
		spindle.setCentre(x, y, z);
		return spindle;
	}
	
	return anchor;
}
