var Base = require('./Base.js').Base;
var Line = require('../geometry/Line.js').Line;
var Point = require('../geometry/Point.js').Point;
var Circle = require('../geometry/Circle.js').Circle;
var Rectangle = require('../geometry/Rectangle.js').Rectangle;

module.exports.BaseFactory = BaseFactory

function BaseFactory() {
	const
	DEFAULT_THICKNESS = 2;

	var base, components;
	var thickness = DEFAULT_THICKNESS;
	var floorZ;

	this.makeBase = function(componentsToMakeFrom) {
		components = componentsToMakeFrom;
		createBase();
		addBaseFloor();
		addSupportForHighComponents();
		addAuxillaryComponents();
		return base;
	}

	var createBase = function() {
		base = new Base();
		base.setHeight(thickness);
	}

	var addBaseFloor = function() {
		var baseMinX = 0, baseMinY = 0, baseMinZ = 0;
		var baseMaxX = 0, baseMaxY = 0;
		for (var i = 0; i < components.length; i++) {
			var basePoint = components[i].getBaseCoor();
			var length = components[i].getLength();
			var width = components[i].getWidth();

			var compMinX = basePoint.getX().getValue() - length / 2;
			var compMaxX = basePoint.getX().getValue() + length / 2;
			var compMinY = basePoint.getY().getValue() - width / 2;
			var compMaxY = basePoint.getY().getValue() + width / 2;
			var compMinZ = basePoint.getZ().getValue();

			if (baseMinX > compMinX)
				baseMinX = compMinX;
			if (baseMaxX < compMaxX)
				baseMaxX = compMaxX;
			if (baseMinY > compMinY)
				baseMinY = compMinY;
			if (baseMaxY < compMaxY)
				baseMaxY = compMaxY;
			if (baseMinZ > compMinZ) {
				baseMinZ = compMinZ;
				floorZ = compMinZ;
			}
		}

		var x = (baseMaxX + baseMinX) / 2;
		var y = (baseMaxY + baseMinY) / 2;
		var z = baseMinZ - thickness / 2;
		var length = (baseMaxX - baseMinX);
		var width = (baseMaxY - baseMinY);

		var rectangle = new Rectangle();
		rectangle.setLength(length);
		rectangle.setWidth(width);
		rectangle.setHeight(thickness);
		rectangle.setCentre(x, y, z);
		base.addPart(rectangle);
	}

	var addAuxillaryComponents = function() {
		for (var i = 0; i < components.length; i++) {
			components[i].generateAuxillaryComponents().forEach(
					function(component) {
						base.addPart(component);
					});
		}
	}

	var addSupportForHighComponents = function() {
		for (var i = 0; i < components.length; i++) {
			var basePoint = components[i].getBaseCoor();
			var compZ = basePoint.getZ().getValue();
			// if the component position is higher than the base floor
			if (compZ > floorZ) {
				var support = components[i].addSupport(floorZ);
				base.addPart(support);
			}
		}
	}

	// Unused
	var addSupportingCirclesToBase = function() {
		for (var i = components.length - 1; i >= 0; i--) {
			if (components[i].getTypeName() == "Gear") {
				var baseCentreZ = calculateBaseCentreZ(components[i]);
				var circle = new Circle();
				circle.setRadius(components[i].getCentreHoleRadius().getValue()
						+ GEAR_LIP);
				var point = new Point();
				point.setAt(components[i].getCentre().getX().getValue(),
						components[i].getCentre().getY().getValue(),
						baseCentreZ);
				circle.setCentre(point);
				base.addPart(circle);
			}
		}
		;
	}

	var calculateBaseCentreZ = function(component) {
		var componentCentreZ = component.getCentre().getZ().getValue();
		var componentHeight = component.getHeight().getValue();
		var baseHeight = base.getHeight().getValue();
		return componentCentreZ - (componentHeight / 2) - (baseHeight / 2);
	}

	var addSupportingLinesToBase = function() {
		for (var i = 0; i < components.length; i++) {
			for (var j = 0; j < components.length && j != i; j++) {
				if (components[i].isAdjacentTo(components[j]))
					addSupportingLineBetween(components[i], components[j]);
			}
		}
	}

	var addSupportingLineBetween = function(startComponent, endComponent) {
		var baseCentreZ = calculateBaseCentreZ(startComponent);
		var startPoint = makePointBelow(startComponent, baseCentreZ);
		var endPoint = makePointBelow(endComponent, baseCentreZ);
		var line = new Line(startPoint, endPoint);
		line.setWidth(GEAR_LIP * 2);
		base.addPart(line);
	}

	var makePointBelow = function(component, baseCentreZ) {
		var point = new Point();
		var componentCentre = component.getCentre();
		var x = componentCentre.getX().getValue();
		var y = componentCentre.getY().getValue();
		var z = baseCentreZ;
		point.setAt(x, y, z);
		return point;
	}
}