var ComponentSpecification = require('./ComponentSpecification.js').ComponentSpecification

module.exports.SpindleSpecification = SpindleSpecification

function SpindleSpecification(spindle) {
	var spec = new ComponentSpecification(spindle);
	spec.height = spindle.getHeight();
	spec.radius = spindle.getRadius();
	return spec;
}
