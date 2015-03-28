/**
 * Daniel's code
 * not needed by spring/anchor framework
 */
Utils = function() {
};

Utils.toDegrees = function(radians) {
	return 180 / Math.PI * radians;
};

Utils.removeCentreHole = function removeCentreHole(component, specification,
		params) {
	if (specification.centreHoleRadius > 0) {
		var spec = {};
		spec.radius = specification.centreHoleRadius;
		spec.height = specification.height * 2;
		var centerHole = Circle.make(spec, params);
		component = component.subtract(centerHole);
	}
	return component;
};
