var ComponentSpecification = require('./ComponentSpecification.js').ComponentSpecification
module.exports.BaseSpecification = BaseSpecification

function BaseSpecification(base) {
	spec = new ComponentSpecification(base)
	spec.thickness = base.getHeight();
	spec.parts = makePartSpecifications(base.getParts());
	return spec
}

function makePartSpecifications(parts) {
	var partSpecs = []
	for (var i = parts.length - 1; i >= 0; i--) {
		partSpecs.push(parts[i].toSpecification())
	};

	return partSpecs
}