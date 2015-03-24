/*
 * This file is part of programmatic-3d-printing, a programmatic 3d printer 
 * language, Copyright (c) 2014, Daniel Patterson <dan24patt@gmail.com>.
 * All rights reserved.
 * 
 * programmatic-3d-printing is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * programmatic-3d-printing is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111, USA.
 */

Base = function() {
};

Base.colour = [ 0.4, 0.4, 0.4 ]

Base.make = function(specification, params) {
	var parts = makeParts(specification, params)
	var base = union(parts)
	return base;
};

function makeParts(specification, params) {
	var parts = []
	var partSpecs = specification.parts
	for (var i = partSpecs.length - 1; i >= 0; i--) {
		if (partSpecs[i].height == undefined) {
			if (specification.height != undefined)
				partSpecs[i].height = specification.height;
			else
				partSpecs[i].height = specification.thickness;
		}
		/*
		if (partSpecs[i].height == undefined && specification.height != undefined)
			partSpecs[i].height = specification.height;
		else if (partSpecs[i].height == undefined && specification.height == undefined)
			partSpecs[i].height = specification.thickness;
		*/
		parts.push(makePart(partSpecs[i], params))
	}
	;

	return parts
}

function makePart(specification, params) {
	specification.id = undefined // suppress IDs of non top-level components
	return ComponentFactory.makeComponent(specification, params)
}