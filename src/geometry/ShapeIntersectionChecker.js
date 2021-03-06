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
 * edited by Jia Heng Eik
 * fix checkIfTwoRectanglesIntersectHorizontally method not working as intended
 * fix checkIfTwoRectanglesIntersect method not working as intended
 * add check Intersect for z axis (assume circle form cylinder, rectangle form cube)
 * 
 * Checks whether Shapes intersect
 */
module.exports.ShapeIntersectionChecker = ShapeIntersectionChecker

function ShapeIntersectionChecker() {
	/*
	 * Required inside he function rather than outside to prevent cyclical
	 * includes. All Shape subclasses require Shape, which requires this. So add
	 * all Shape subclasses INSIDE this function.
	 */
	var Rectangle = require('../geometry/Rectangle.js').Rectangle

	var first, second

	this.areIntersecting = function(firstShape, secondShape) {
		first = firstShape
		second = secondShape
		return checkIfTwoShapesIntersect() && checkIfIntersectAtZ();
	}

	var checkIfIntersectAtZ = function() {
		var z1 = first.getCentre().getZ().getValue();
		var z2 = second.getCentre().getZ().getValue();
		var height1 = first.getHeight();
		var height2 = second.getHeight();
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
	
	var checkIfTwoShapesIntersect = function() {
		if (first.getType() == "Circle") {
			if (second.getType() == "Circle") {
				return checkIfTwoCirclesIntersect()
			} else if (second.getType() == "Rectangle") {
				return checkIfCircleAndRectangleIntersect(first, second)
			}
		} else if (first.getType() == "Rectangle") {
			if (second.getType() == "Circle") {
				return checkIfCircleAndRectangleIntersect(second, first)
			} else if (second.getType() == "Rectangle") {
				return checkIfTwoRectanglesIntersect()
			}
		}
	}

	var checkIfTwoCirclesIntersect = function() {
		var firstRadius = first.getRadius()
		var secondRadius = second.getRadius()
		var distanceBetween = first.getCentre().distanceToOnXYPlane(
				second.getCentre())
		return distanceBetween <= (firstRadius + secondRadius)
	}

	var checkIfTwoRectanglesIntersect = function() {
		return checkIfTwoRectanglesIntersectHorizontally()
				&& checkIfTwoRectanglesIntersectVertically()
	}

	var checkIfTwoRectanglesIntersectHorizontally = function() {
		var combinedLength = first.getLength() + second.getLength()
		var centreXDifference = first.getCentre().distanceToOnAxis(
				second.getCentre(), 'X')
		return Math.abs(centreXDifference) <= (combinedLength / 2)
	}

	var checkIfTwoRectanglesIntersectVertically = function() {
		var combinedWidth = first.getWidth() + second.getWidth()
		var centreYDifference = first.getCentre().distanceToOnAxis(
				second.getCentre(), 'Y')
		//console.log(centreYDifference + ' and ' + combinedWidth);
		//console.log(Math.abs(centreYDifference) <= (combinedWidth / 2));
		return Math.abs(centreYDifference) <= (combinedWidth / 2)
	}

	/*
	 * Calculates the intersection of a Circle and a Rectangle by treating the
	 * Circle as a square. This is not a perfect solution, but is sufficient for
	 * the 2D-grid system that the Component placement system is limited to
	 */
	var checkIfCircleAndRectangleIntersect = function(circle, rectangle) {
		var circleBounds = new Rectangle()
		circleBounds.setCentre(circle.getCentre())
		var radius = circle.getRadius()
		circleBounds.setLength(radius * 2)
		circleBounds.setWidth(radius * 2)
		first = rectangle
		second = circleBounds
		return checkIfTwoRectanglesIntersect()
	}
}