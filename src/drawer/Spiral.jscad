Spiral = function() {
};

/*
 * Specification has thickness, turn, max_r
 */
Spiral.make = function(specification, params) {
	var sqrt3 = Math.sqrt(3) / 2;
	var radius = specification.thickness / 2;
	
	var length = specification.thickness / 2;
	var width = specification.width / 2;

	var startR = specification.startRadius;
	var rotation = specification.turn;
	var max_r = specification.maxRadius;
	
	var max_slices = (rotation * max_r) / 10 * params.circleRes;
	
	var total_rad = Math.PI * 2 * rotation;
	var total_deg = 360 * rotation;
	var rIncrement = (max_r - startR); // constant (a)

	if (specification.startRadius != undefined) {
		startR = specification.startRadius;
	}

	// unused hexagon cross section
	var hex = CSG.Polygon.createFromPoints([ [ 0, 0, radius ],
			[ radius * sqrt3, 0, radius / 2 ],
			[ radius * sqrt3, 0, -radius / 2 ], [ 0, 0, -radius ],
			[ -radius * sqrt3, 0, -radius / 2 ],
			[ -radius * sqrt3, 0, radius / 2 ] ]);
	
	// rectangle cross section
	var rec = CSG.Polygon.createFromPoints([ [width, 0, length],
	                                         [width, 0, -length],
	                                         [-width, 0, -length],
	                                         [-width, 0, length] ]);
	
	return rec.solidFromSlices({
		numslices : max_slices,
		callback : function(t, slice) {
			var t = slice / max_slices;
			var rad = t * total_rad; // convert t to rad
			var r = rIncrement * t + startR; // r = a t + c
			if (r > max_r)
				throw new Error("more than max R!!!\nslice: " + slice
						+ "\nmax: " + max_slices + "\nr: " + r + "\nmaxr "
						+ max_r + "rIncre: " + rIncrement);
			var x = r * Math.cos(rad);
			var y = r * Math.sin(rad);
			return this.rotateZ(t * total_deg).translate(
					[ x, y, 0 ]);
		}
	});
};
