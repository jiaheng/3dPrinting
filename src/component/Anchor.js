var Component = require('./Component.js').Component;
var AnchorSpecification = require('../interface/AnchorSpecification.js').AnchorSpecification;
var Point = require('../geometry/Point.js').Point;
var Rectangle = require('../geometry/Rectangle.js').Rectangle;
var Circle = require('../geometry/Circle.js').Circle;
var Spindle = require('./Spindle.js').Spindle;
var ConstrainableValue = require('../constraint/ConstrainableValue.js').ConstrainableValue;

module.exports.Anchor = Anchor

function Anchor() {
	var anchor = new Component();

	const DEFAULT_THICKNESS = 10;
	const DEFAULT_ANCHOR_LENGTH = 45;
	const DEFAULT_ANCHOR_WIDTH = 4; 
	const DEFAULT_FORK_LENGTH = 50;
	const DEFAULT_FORK_WIDTH = 8;
	const DEFAULT_CONNECT_WIDTH = 4;
	const DEFAULT_CONNECT_LENGTH = 3;
	const DEFAULT_CENTRE_HOLE_RADIUS = 3;
	const DEFAULT_CENTRE_RING_RADIUS = 12;
	const DEFAULT_CONNECTOR_LENGTH = 9;
	const DEFAULT_CONNECTOR_WIDTH = 8;

	var anchorLength = DEFAULT_ANCHOR_LENGTH;
	var forkLength = DEFAULT_FORK_LENGTH;
	var forkWidth = DEFAULT_FORK_WIDTH;
	var connectWidth = DEFAULT_CONNECT_WIDTH;
	var connectLength = DEFAULT_CONNECT_LENGTH;
	var centreHoleRadius = DEFAULT_CENTRE_HOLE_RADIUS;
	var centreRingRadius = DEFAULT_CENTRE_RING_RADIUS;
	var anchorWidth = DEFAULT_ANCHOR_WIDTH; 
	var connectorLength = DEFAULT_CONNECTOR_LENGTH;
	var connectorWidth = DEFAULT_CONNECTOR_WIDTH;
	var connectedSpring = null;
	
	var thickness = new ConstrainableValue();
	var height = new ConstrainableValue();
	height.sameAs(thickness);
	thickness.setValue(DEFAULT_THICKNESS);
	
	anchor.setCentre(0, 0, 0);

	var checkParameter = function() {
		if (anchor.getThickness() <=0 )
			throw new Error('Thickness must be more than zero');
		if (anchor.getAnchorLength() <= 0)
			throw new Error('Anchor length must be more than zero');
		if (anchor.getForkLength() <= 0)
			throw new Error('Fork length must be more than zero');
		if (anchor.getForkWidth() <= 0)
			throw new Error('Fork width must be more than zero');
		if (anchor.getConnectWidth() <= 0)
			throw new Error('Connect width must be more than zero');
		if (anchor.getConnectLength() <= 0)
			throw new Error('Connect length must be more than zero');
		if (anchor.getCentreHoleRadius() <= 0)
			throw new Error('Centre hole radius must be more than zero');
		if (anchor.getCentreRingRadius() <=0 )
			throw new Error('Centre ring radius must be more than zero');
		if (anchor.getAnchorWidth() <= 0)
			throw new Error('Anchor width must be more than zero');
		if (anchor.getConnectorLength() <= 0)
			throw new Error('Connector length must be more than zero');
		if (anchor.getConnectorWidth() <= 0)
			throw new Error('Connector width must be more than zero');
		
		if (anchor.getCentreHoleRadius() >= anchor.getCentreRingRadius())
			throw new Error('Centre hole radius should be smaller than centre ring radius');
		if (anchor.getCentreRingRadius() >= anchor.getForkLength())
			throw new Error('Fork length should be larger than centre ring radius');
		if (anchor.getCentreRingRadius() >= anchor.getAnchorLength())
			throw new Error('Anchor length should be larger than centre ring radius');
		if (anchor.getConnectorLength() <= anchor.getConnectLength())
			throw new Error('Anchor connector length should be larger than connect length');
		if (anchor.getConnectorWidth() <= anchor.getConnectWidth())
			throw new Error('Anchor connector width should be larger than connect width');
	}
	
	anchor.toSpecification = function() {
		checkParameter();
		return new AnchorSpecification(anchor);
	}

	anchor.getTypeName = function() {
		return "Anchor";
	}

	anchor.getThickness = function() {
		return thickness.getValue();
	}

	anchor.getAnchorLength = function() {
		return anchorLength;
	}
	
	anchor.getForkLength = function() {
		return forkLength;
	}
	
	anchor.getForkWidth = function() {
		return forkWidth;
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
		return height.getValue();
	}

	anchor.getAnchorWidth = function() {
		return anchorWidth;
	}

	anchor.getConnectorLength = function() {
		return connectorLength;
	}

	anchor.getConnectorWidth = function() {
		return connectorWidth;
	}

	anchor.getBaseCoor = function() {
		var thickness = anchor.getThickness();
		var centre = anchor.getCentre();
		var point = new Point();
		
		var x = centre.getX().getValue();
		var y = centre.getY().getValue();
		var z = centre.getZ().getValue() - thickness / 2;
		point.setAt(x, y, z);
		return point;
	}

	anchor.getWidth = function() {
		var width;
		width = anchor.getAnchorLength();
		return width;
	}

	anchor.getLength = function() {
		var length;
		length = anchor.getAnchorLength();
		length += anchor.getForkLength();
		return length;
	}

	anchor.setThickness = function(newThickness) {
		thickness.setValue(newThickness);
	}

	anchor.setAnchorLength = function(newLength) {
		anchorLength = newLength;
	}

	anchor.setForkLength = function(newLength) {
		forkLength = newLength;
	}
	
	anchor.setForkWidth = function(newWidth) {
		forkWidth = newWidth;
	}
	
	anchor.setConnectWidth = function(w) {
		connectWidth = w;
	}

	anchor.setConnectLength = function(l) {
		connectLength = l;
	}

	anchor.setCentreHoleRadius = function(newCentreHoleRadius) {
		centreHoleRadius = newCentreHoleRadius;
	}

	anchor.setCentreRingRadius = function(newCentreRingRadius) {
		centreRingRadius = newCentreRingRadius;
	}

	anchor.setAnchorWidth = function(newAnchorWidth) {
		anchorWidth = newAnchorWidth;
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
		var forkLength = anchor.getForkLength();
		var connectorLength = anchor.getConnectorLength();
		var height = anchor.getHeight();
		
		var x = centre.getX().getValue();
		var y = centre.getY().getValue() + forkLength + connectorLength;
		var z = centre.getZ().getValue() + height / 2;
		point.setAt(x, y, z);
		return point;
	}

	var checkBeforePlacement = function(otherComponent) {
		if (anchor.isPlaceWithSpring())
			throw new Error('Anchor already connected with another spring');
		if (otherComponent.getTypeName() != 'Spring')
			throw new Error("Anchor can only place with a spring");
		
		var diff = anchor.getConnectWidth() - otherComponent.getRoundedCubeWidth();
		if (Math.abs(diff) > 0.001)
			throw new Error('Unable to place anchor with the spring: the rounded cube width is not the same as connect width');
		if (anchor.getThickness() > otherComponent.getRoundedCubeHeight())
			throw new Error('Unable to place anchor with the spring: the rounded cube height less than anchor thickness');
	}
	
	anchor.placeWith = function(otherComponent) {
		checkBeforePlacement(otherComponent);
		anchor.connectedSpring = otherComponent;
		anchor.relocate();
		otherComponent.link(anchor);
	}

	anchor.link = function(otherComponent) {
		if (anchor.isPlaceWithSpring())
			throw new Error('Anchor already place with a spring');
		if (otherComponent.getConnectedAnchor() === anchor)
			anchor.connectedSpring = otherComponent;
		else
			throw new Error('Component not the same');
	}
	
	anchor.getConnectedSpring = function() {
		return anchor.connectedSpring;
	}
	
	anchor.getSpindle = function() {
		var height = anchor.getHeight();
		var centreHoleRadius = anchor.getCentreHoleRadius();
		
		var spindle = new Spindle(height, centreHoleRadius);
		var centre = anchor.getCentre();
		var x = centre.getX().getValue();
		var y = centre.getY().getValue();
		var z = centre.getZ().getValue();
		spindle.setCentre(x, y, z);
		return spindle;
	}

	anchor.generateAuxillaryComponents = function() {
		return [ anchor.getSpindle() ];
	}

	anchor.addSupport = function(floorZ) {
		var baseCoor = anchor.getBaseCoor();
		var bottomZ = baseCoor.getZ().getValue();

		var x = baseCoor.getX().getValue();
		var y = baseCoor.getY().getValue();
		var z = (bottomZ + floorZ) / 2;
		var length = centreRingRadius * 2;
		var width = centreRingRadius * 2;
		var height = (bottomZ - floorZ);

		var rectangle = new Rectangle();
		rectangle.setLength(length);
		rectangle.setWidth(width);
		rectangle.setHeight(height);
		rectangle.setCentre(x, y, z);
		return rectangle;
	}

	anchor.isPlaceWithSpring = function() {
		return (anchor.connectedSpring != null);
	}
	
	anchor.unlink = function() {
		var spring = anchor.connectedSpring;
		anchor.connectedSpring = null;
		if (spring.isPlaceWithAnchor())
			spring.unlink();
	}
	
	anchor._setCentre = anchor.setCentre;
	
	anchor.setCentre = function(arg1, arg2, arg3) {
		anchor._setCentre(arg1, arg2, arg3);
		if (anchor.isPlaceWithSpring())
			anchor.connectedSpring.relocate();
	}
	
	anchor.relocate = function() {
		var connectP = anchor.getConnectPoint();
		var springConnectP = anchor.connectedSpring.getConnectPoint();
		var centre = anchor.getCentre();
		var newX = centre.getX().getValue() + springConnectP.getX().getValue() - connectP.getX().getValue();
		var newY = centre.getY().getValue() + springConnectP.getY().getValue() - connectP.getY().getValue();
		var newZ = centre.getZ().getValue() + springConnectP.getZ().getValue() - connectP.getZ().getValue();
		anchor._setCentre(newX, newY, newZ); // call super method setCentre only
	}
	
	anchor._checkCollideWith = anchor.checkCollideWith;
	
	anchor.checkCollideWith = function(component) {
		if (anchor.getConnectedSpring() == component)
			return;
		anchor._checkCollideWith(component);
	}

	anchor.getBoundaryShapes = function() {
		var shapes = [];
		var shape;
		var centre = anchor.getCentre();
		var x, y, z;
		
		// find largest radius for circle
		// compare fork+connector length with anchor
		var forkLength = anchor.getForkLength() + anchor.getConnectorLength();
		var anchorLength = anchor.getAnchorLength();
		var radius = forkLength > anchorLength? forkLength : anchorLength;
		
		shape = new Circle();
		shape.setRadius(radius);
		shape.setHeight(anchor.getThickness());
		shape.setCentre(centre);
		shapes.push(shape);
		
		return shapes;
	}
	
	return anchor;
}
