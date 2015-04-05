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

/*
 * author: Daniel Patterson
 *
 * The base class for all components.
 */
var Point = require('../geometry/Point.js').Point
var Circle = require('../geometry/Circle.js').Circle
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification

module.exports.Component = Component

var nextID = 1

Component.makeNextID = function() {
	nextID++
	return (nextID - 1)
}

var isIntersectAtZ = function(shape1, shape2) {
	var z1 = shape1.getCentre().getZ().getValue();
	var z2 = shape2.getCentre().getZ().getValue();
	var height1 = shape1.getHeight();
	var height2 = shape2.getHeight();
	var minZ1 = z1 - height1 / 2;
	var maxZ1 = z1 + height1 / 2;
	var minZ2 = z2 - height2 / 2;
	var maxZ2 = z2 + height2 / 2;
	if (minZ1 >= minZ2 && minZ1 <= maxZ2)
		return true;
	if (minZ2 >= minZ1 && minZ2 <= maxZ1)
		return true;
	return false;
}

function Component(boundaryShape) {
	if (boundaryShape == undefined)
		boundaryShape = Circle

	var id = Component.makeNextID()
	return {
		boundingShape : new boundaryShape(),

		getID : function() {
			return id
		},

		getBoundingShape : function() {
			return this.boundingShape
		},

		getCentre : function() {
			return this.boundingShape.getCentre()
		},

		setCentre : function(arg1, arg2, arg3) {
			this.boundingShape.setCentre(arg1, arg2, arg3)
		},

		checkCentreFullyDefined : function() {
			if (this.getCentre().isNotFullyDefined())
				throw "Point not fully defined"
		},

		toSpecification : function() {
			this.checkCentreFullyDefined()
			return new ComponentSpecification(this)
		},

		// Should be overriden by all subclassed to give their name
		getTypeName : function() {
			return "Component"
		},

		checkCollideWith : function(component) {
			var shapes = this.getBoundaryShapes();
			var otherShapes = component.getBoundaryShapes();
			for (var i = 0; i < shapes.length; i++) {
				for (var j = 0; j < otherShapes.length; j++) {
					// TODO: remove if below
					/*
					if(shapes[i].getType() == 'Rectangle' && shapes[i].getCentre().getZ().getValue() == 20 || 
							otherShapes[j].getType() == 'Rectangle' && otherShapes[j].getCentre().getZ().getValue() == 20) {
						console.log(shapes[i].getType() + ' shape[i] at ' + shapes[i].getCentre().toString() + ' and height ' + shapes[i].getHeight());
						console.log(otherShapes[j].getType() + ' otherShape[j] at ' + otherShapes[j].getCentre().toString() + ' and height ' + otherShapes[j].getHeight());
						console.log('touching? ' + shapes[i].isTouching(otherShapes[j]));
						console.log();
					}*/
					if (shapes[i].isTouching(otherShapes[j]) && isIntersectAtZ(shapes[i], otherShapes[j])) {
						var err_msg = this.getTypeName() + ' is collide with ' + component.getTypeName();
						throw new Error(err_msg);
					}
				}
			}
		},
		
		// sub classes need to overwrite this method to work properly
		getBoundaryShapes : function() {
			throw new Error('Subclass "getBoundaryShapes" method is not defined');
		},
		
		isTouching : function(otherComponent) {
			return this.boundingShape.isTouching(otherComponent
					.getBoundingShape())
		},

		toString : function() {
			var string = this.getTypeName() + ' { \n\tID: ' + id + '\n'
			string += '\tCentre point: ' + this.getCentre().toString() + '\n'
			string += '}'
			return string
		}
	}
}
