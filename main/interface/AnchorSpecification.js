var ComponentSpecification = require('./ComponentSpecification.js').ComponentSpecification;

module.exports.AnchorSpecification = AnchorSpecification

function AnchorSpecification(anchor) {
  var spec = new ComponentSpecification(anchor);
  spec.thickness = anchor.getThickness();
  spec.maxRadius = anchor.getMaxRadius();
  spec.connectSize = anchor.getConnectSize();
  spec.centreHoleRadius = anchor.getCentreHoleRadius();
  spec.centreRingRadius = anchor.getCentreRingRadius();
  spec.height = anchor.getHeight();
  spec.handWidth = anchor.getHandWidth();
  return spec;
}
