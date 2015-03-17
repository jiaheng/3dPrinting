var ComponentSpecification = require('./ComponentSpecification.js').ComponentSpecification;

module.exports.SpringSpecification = SpringSpecification

function SpringSpecification(spring) {
	var spec = new ComponentSpecification(spring);
	spec.thickness = spring.getThickness();
	spec.turn = spring.getTurn();
	spec.maxRadius = spring.getMaxRadius();
	spec.startRadius = spring.getStartRadius();
	spec.outerCylinderRadius = spring.getOuterCylinderRadius();
	spec.outerCylinderHeight = spring.getOuterCylinderHeight();
	spec.innerCylinderRadius = spring.getInnerCylinderRadius();
	spec.innerCylinderHeight = spring.getInnerCylinderHeight();
	spec.centreHoleRadius = spring.getCentreHoleRadius();
	spec.roundedCubeHeight = spring.getRoundedCubeHeight();
	spec.roundedCubeLength = spring.getRoundedCubeLength();
	spec.roundedCubeWidth = spring.getRoundedCubeWidth();
	spec.height = spring.getHeight();
	return spec;
}
