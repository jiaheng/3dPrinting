include("Circle.jscad");
include("Utils.jscad");
include("Rectangle.jscad");

Anchor = function() {
};

Anchor.make = function(specification, params) {
	var anchor;

	var cylinder;
	var cylinderSpec = {};
	var cube;
	var cubeSpec = {};
	var shiftX, shiftY;

	cylinderSpec.height = specification.thickness;
	cylinderSpec.radius = specification.centreRingRadius;
	cylinder = Circle.make(cylinderSpec, params);
	anchor = cylinder;

	// fork
	var fork;
	cubeSpec.length = specification.maxRadius;
	cubeSpec.width = specification.handWidth;
	cubeSpec.height = specification.thickness;
	fork = Rectangle.make(cubeSpec, params);
	// make connector
	var connector;
	var connectorLength = 5; // constant length
	var connectorWidth = specification.handWidth + 2; // connector must be
														// wider
	cubeSpec.width = connectorWidth;
	cubeSpec.length = connectorLength;
	connector = Rectangle.make(cubeSpec, params);
	connector = connector.translate([
			(specification.maxRadius + connectorLength) / 2, 0, 0 ]);
	// make hole in the connector
	var hole;
	var holeLength = 2; // constant length
	cubeSpec.width = specification.connectSize;
	cubeSpec.length = holeLength;
	cube = Rectangle.make(cubeSpec, params);
	cylinderSpec.height = specification.thickness;
	cylinderSpec.radius = specification.connectSize / 2;
	cylinder = Circle.make(cylinderSpec, params);
	cylinder = cylinder.translate([ -holeLength / 2, 0, 0 ]);
	hole = cube.union(cylinder);
	hole = hole.translate([
			specification.maxRadius / 2 + connectorLength - holeLength / 2, 0,
			0 ]);
	connector = connector.subtract(hole);
	fork = fork.union(connector);

	fork = fork.rotateZ(90).translate([ 0, specification.maxRadius / 2, 0 ]);
	anchor = anchor.union(fork);

	// left pallet
	var deg = 180 - 120; // the angle between pallets is 120 degree
	cubeSpec.length = specification.maxRadius;
	cubeSpec.width = specification.handWidth;
	cubeSpec.height = specification.thickness;
	shiftX = -specification.maxRadius / 2 * Math.cos(Math.PI * deg / 360);
	shiftY = -specification.maxRadius / 2 * Math.sin(Math.PI * deg / 360);
	cube = Rectangle.make(cubeSpec, params);
	cube = cube.rotateZ(deg / 2).translate([ shiftX, shiftY, 0 ]);
	anchor = anchor.union(cube);

	// right pallet the angle between pallet is 90 degree
	shiftX = specification.maxRadius / 2 * Math.cos(Math.PI * deg / 360);
	shiftY = -specification.maxRadius / 2 * Math.sin(Math.PI * deg / 360);
	cube = Rectangle.make(cubeSpec, params);
	cube = cube.rotateZ(-deg / 2).translate([ shiftX, shiftY, 0 ]);
	anchor = anchor.union(cube);

	// remove centre hole
	anchor = Utils.removeCentreHole(anchor, specification, params);

	return anchor;
}
