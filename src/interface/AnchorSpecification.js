var ComponentSpecification = require('./ComponentSpecification.js').ComponentSpecification;

module.exports.AnchorSpecification = AnchorSpecification

function AnchorSpecification(anchor) {
	var spec = new ComponentSpecification(anchor);
	spec.thickness = anchor.getThickness();
	spec.maxRadius = anchor.getMaxRadius();
	spec.connectWidth = anchor.getConnectWidth();
	spec.connectLength = anchor.getConnectLength();
	spec.connectorLength = anchor.getConnectorLength();
	spec.connectorWidth = anchor.getConnectorWidth();
	spec.centreHoleRadius = anchor.getCentreHoleRadius();
	spec.centreRingRadius = anchor.getCentreRingRadius();
	spec.height = anchor.getHeight();
	spec.handWidth = anchor.getHandWidth();
	return spec;
}
