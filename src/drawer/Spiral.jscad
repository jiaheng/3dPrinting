Spiral = function() {
};

/*
 * Specification has thickness, turn, max_r
 */
Spiral.make = function(specification, params) {
	var startR = specification.startRadius;
	var sqrt3 = Math.sqrt(3) / 2;
	var radius = specification.thickness / 2;
	var rotation = specification.turn;
	var max_r = specification.maxRadius;
	var max_slices = (rotation * max_r)/10 * params.circleRes; // default 1000
	var total_rad = Math.PI * 2 * rotation;
	var total_deg = 360 * rotation;
	var rIncrement = (max_r - startR) / max_slices;

	if (specification.startRadius != undefined) {
		startR = specification.startRadius;
	}

	var hex = CSG.Polygon.createFromPoints([ [ 0, 0, radius ],
			[ radius * sqrt3, 0, radius / 2 ],
			[ radius * sqrt3, 0, -radius / 2 ], [ 0, 0, -radius ],
			[ -radius * sqrt3, 0, -radius / 2 ],
			[ -radius * sqrt3, 0, radius / 2 ] ]);

	return hex.solidFromSlices({
		numslices : max_slices,
		callback : function(t, slice) {
			var rad = slice / max_slices * total_rad;
			// r = a + b theta
			var r = rIncrement * slice + startR;
			if (r > max_r) throw new Error("more than max R!!!\nslice: " + slice + "\nmax: " + max_slices + "\nr: " + r +"\nmaxr " + max_r + "rIncre: " + rIncrement);
			var x = r * Math.cos(rad);
			var y = r * Math.sin(rad);
			return this.rotateZ(slice / max_slices * total_deg).translate(
					[ x, y, 0 ]);
		}
	});
};
