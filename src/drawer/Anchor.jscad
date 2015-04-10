include("Circle.jscad");
include("Utils.jscad");
include("Rectangle.jscad");

Anchor = function() {
};

Anchor.colour = [ 0.2, 0.2, 0.8 ];

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
	cubeSpec.length = specification.forkLength;
	cubeSpec.width = specification.forkWidth;
	cubeSpec.height = specification.thickness;
	fork = Rectangle.make(cubeSpec, params);
	// make connector
	var connector;
	var connectorLength = specification.connectorLength;
	var connectorWidth = specification.connectorWidth;
	cubeSpec.width = connectorWidth;
	cubeSpec.length = connectorLength;
	connector = Rectangle.make(cubeSpec, params);
	connector = connector.translate([
			(specification.forkLength + connectorLength) / 2, 0, 0 ]);
	// make hole in the connector
	var hole;
	var holeLength = specification.connectLength; // constant length
	cubeSpec.width = specification.connectWidth;
	cubeSpec.length = holeLength;
	cube = Rectangle.make(cubeSpec, params);
	// inner hole is rounded
	cylinderSpec.height = specification.thickness;
	cylinderSpec.radius = specification.connectWidth / 2;
	cylinder = Circle.make(cylinderSpec, params);
	cylinder = cylinder.translate([ -holeLength / 2, 0, 0 ]);
	hole = cube.union(cylinder);
	
	// outer hole is wider
	var solid = polyhedron({
		points : [
				[ cubeSpec.length / 2, cubeSpec.width / 2, cubeSpec.height / 2 ], 
				[ cubeSpec.length / 2, cubeSpec.width / 2, -cubeSpec.height / 2 ], 
				[ cubeSpec.length / 2, specification.connectorWidth / 2,
						cubeSpec.height / 2 ],
				[ cubeSpec.length / 2, specification.connectorWidth / 2,
						-cubeSpec.height / 2 ],
				[ cubeSpec.length / 2 - 2, cubeSpec.width / 2,
						cubeSpec.height / 2 ], 
				[ cubeSpec.length / 2 - 2, cubeSpec.width / 2,
						-cubeSpec.height / 2 ]
		],
		triangles : [ [ 1, 3, 5 ], [ 4, 2, 0 ], [ 5, 4, 0 ], [ 0, 1, 5 ],
				[ 0, 2, 1 ], [ 1, 2, 3 ], [ 2, 4, 5 ], [ 3, 2, 5 ] ]
	});

	hole = hole.union(solid);
	solid = polyhedron({
		points : [
				[ cubeSpec.length / 2, -cubeSpec.width / 2, cubeSpec.height / 2 ], 
				[ cubeSpec.length / 2, -cubeSpec.width / 2,
						-cubeSpec.height / 2 ], 
				[ cubeSpec.length / 2, -specification.connectorWidth / 2,
						cubeSpec.height / 2 ], 
				[ cubeSpec.length / 2, -specification.connectorWidth / 2,
						-cubeSpec.height / 2 ], 
				[ cubeSpec.length / 2 - 2, -cubeSpec.width / 2,
						cubeSpec.height / 2 ], 
				[ cubeSpec.length / 2 - 2, -cubeSpec.width / 2,
						-cubeSpec.height / 2 ] 
		],
		triangles : [ [ 3, 1, 5 ], [ 4, 0, 2 ], [ 0, 5, 4 ], [ 1, 0, 5 ],
				[ 0, 1, 2 ], [ 1, 3, 2 ], [ 4, 2, 5 ], [ 2, 3, 5 ] ]
	});

	hole = hole.union(solid);
	hole = hole.translate([
			specification.forkLength / 2 + connectorLength - holeLength / 2, 0,
			0 ]);
	connector = connector.subtract(hole);
	fork = fork.union(connector);

	fork = fork.rotateZ(90).translate([ 0, specification.forkLength / 2, 0 ]);
	anchor = anchor.union(fork);

	// left side anchor
	var deg = 180 - 120; // the angle between anchor is 120 degree
	cubeSpec.length = specification.anchorLength;
	cubeSpec.width = specification.anchorWidth;
	cubeSpec.height = specification.thickness;
	shiftX = -specification.anchorLength / 2 * Math.cos(Math.PI * deg / 360);
	shiftY = -specification.anchorLength / 2 * Math.sin(Math.PI * deg / 360);
	cube = Rectangle.make(cubeSpec, params);
	cube = cube.rotateZ(deg / 2).translate([ shiftX, shiftY, 0 ]);
	anchor = anchor.union(cube);

	// right side anchor, the angle between left and right anchor is 90 degree
	shiftX = specification.anchorLength / 2 * Math.cos(Math.PI * deg / 360);
	shiftY = -specification.anchorLength / 2 * Math.sin(Math.PI * deg / 360);
	cube = Rectangle.make(cubeSpec, params);
	cube = cube.rotateZ(-deg / 2).translate([ shiftX, shiftY, 0 ]);
	anchor = anchor.union(cube);

	// remove centre hole
	anchor = Utils.removeCentreHole(anchor, specification, params);

	return anchor;
}
