/*
 * Daniel's code
 */

Spindle = function() {
};

Spindle.colour = [ 0.9, 0.1, 0.1 ];

Spindle.make = function(specification, params) {
	specification.radius = specification.radius - params.printerMinRes
	var spindle = Circle.make(specification, params);
	return spindle;
};