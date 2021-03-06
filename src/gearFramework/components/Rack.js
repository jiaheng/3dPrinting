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
 * A rack - part of a rack and pinion. A bar with a toothed edge. It;s length is
 * defined along the line of teeth, ie:
 *
 *			      		 Front
 *      /\_/\_/\_/\_/\_/\_/\_/\_/\  |
 *      |                         | |
 * Left |--------- length --------| | width  Right
 *      |_________________________| |
 * 
 *                  Back
 *
 *            Front
 *				 ___________
 *         |    |     >
 *         |    |     |
 *         |    |     >
 *         |    |     |
 *         |    |     >
 *         |  length  |
 *    Left |    |     > Right
 *         |    |     |
 *         |    |     >
 *         |    |     |
 *         |    |     >
 *         |    |     |
 *         |    |     >
 *         ____________
 *         ----width---
 *
 *            Back
 *
 *
 *
 * edited by Jia Heng Eik
 * update dependency path
 */
var ToothedComponent = require(__dirname + '/../components/ToothedComponent.js').ToothedComponent
var Rectangle = require(__dirname + '/../../geometry/Rectangle.js').Rectangle
var ConstrainableValue = require(__dirname + '/../../constraint/ConstrainableValue.js').ConstrainableValue
var RackSupport = require(__dirname + '/../components/RackSupport.js').RackSupport
var RackSpecification = require(__dirname + '/../interface/RackSpecification.js').RackSpecification
module.exports.Rack = Rack 

Rack.FACES = ["Front", "Back", "Left", "Right"]
Rack.FACE_TO_AXIS = new Object()
Rack.FACE_TO_AXIS.Front = "X"
Rack.FACE_TO_AXIS.Back = "X"
Rack.FACE_TO_AXIS.Left = "Y"
Rack.FACE_TO_AXIS.Right = "Y"

function Rack() {
	const DEFAULT_TOOTH_FACE = Rack.FACES[0]
	const DEFAULT_WIDTH = 15

	var rack = new ToothedComponent(Rectangle)
	var linearPitch = null
	var length = new ConstrainableValue()
	var width = new ConstrainableValue()
	width.setValue(DEFAULT_WIDTH)
	var toothedFace = DEFAULT_TOOTH_FACE
	var lengthAxis = Rack.FACE_TO_AXIS[toothedFace]

	rack.getTypeName = function() {
		return "Rack"
	}

	rack.setCircularPitch = function(pitch) {
		rack.setLinearPitch(pitch)
	}

	rack.getLinearPitch = function() {
		if (linearPitch == null) {
			checkCanCalculateLinearPitch()
			calculateLinearPitch()
		}
		return linearPitch
	}

	rack.getCircularPitch = function() {
		return rack.getLinearPitch()
	}

	rack.setLinearPitch = function(p) {
		checkHasEitherNumberOfTeethOrLength()
		linearPitch = p
		if (rack.getNumberOfTeeth().isNotSet()) {
			var numTeeth = calculateNumberOfTeethFromLength()
			rack.setNumberOfTeeth(numTeeth)
		}
		else if (rack.getLength().isNotSet()) {
			var len = calculateLengthFromNumberOfTeeth()
			rack.setLength(len)
		}
		setShapeSizes()
	}

	var checkHasEitherNumberOfTeethOrLength = function() {
		if (rack.getNumberOfTeeth().isNotSet() 
			  && rack.getLength().isNotSet()) {
			throw new Error("Number of teeth or length not set")
		}
		else if (rack.getNumberOfTeeth().isSet() 
			  && rack.getLength().isSet()) { 
			throw new Error("Circular pitch already set")
		}
	}

	var checkCanCalculateLinearPitch = function() {
		if (rack.getNumberOfTeeth().isNotSet()) throw new Error("Number of teeth not set")
		if (length.isNotSet()) throw new Error("Length not set")
	}

	var calculateLinearPitch = function() {		
			linearPitch = length.getValue() / rack.getNumberOfTeeth().getValue()
	}

	var calculateNumberOfTeethFromLength = function() {
		return rack.getLength().getValue() / linearPitch
	}

	var calculateLengthFromNumberOfTeeth = function() {
		return linearPitch * rack.getNumberOfTeeth().getValue()
	}

	rack.getWidth = function() {
		return width
	}

	rack.getLength = function() {
		return length
	}

	// Length along tooth direction
	rack.setLength = function(len) {
		length.setValue(len)
		setShapeSizes()
	}

	rack.setWidth = function(w) {
		width.setValue(w)
		setShapeSizes()
	}

	rack.getAddendum = function() {
		return linearPitch / Math.PI
	}

	rack.setToothedFace = function(face) {
		if (Rack.FACES.indexOf(face) < 0)
			throw new Error("Invalid face")
		toothedFace = face
		lengthAxis = Rack.FACE_TO_AXIS[toothedFace]
		setShapeSizes()
	}

	rack.isValid = function() {
		return rack.getAdjacentComponents().length <= 1
	}

	rack.checkIsValid = function() {
		if (!rack.isValid())
			throw new Error("Invalid Rack - only one adjacent component allowed")
	}

	rack._placeablePlaceAtFrontOf = rack.placeAtFrontOf

	rack.placeAtFrontOf = function(placeableComponent) {
		rack.setToothedFace("Back")
		rack._placeablePlaceAtFrontOf(placeableComponent)
	}

	rack._placeablePlaceAtBackOf = rack.placeAtBackOf

	rack.placeAtBackOf = function(placeableComponent) {
		rack.setToothedFace("Front")
		rack._placeablePlaceAtBackOf(placeableComponent)
	}

	rack._placeablePlaceOnLeftOf = rack.placeOnLeftOf

	rack.placeOnLeftOf = function(placeableComponent) {
		rack.setToothedFace("Right")
		rack._placeablePlaceOnLeftOf(placeableComponent)
	}

	rack._placeablePlaceOnRightOf = rack.placeOnRightOf

	rack.placeOnRightOf = function(placeableComponent) {
		rack.setToothedFace("Left")
		rack._placeablePlaceOnRightOf(placeableComponent)
	}

	rack._placeableAddAjacentComponent = rack.addAdjacentComponent
	rack.addAdjacentComponent = function(component, position) {
		rack.setToothedFace(position)
		rack._placeableAddAjacentComponent(component)
	}

	var setShapeSizes = function() {
		var bound = rack.getBoundingShape()
		var placement = rack.getPlacementShape()
		if (lengthAxis == "X") {
			bound.setLength(length.getValue())
			bound.setWidth(width.getValue())
			placement.setLength(length.getValue())
			placement.setWidth(width.getValue() - 2 * rack.getAddendum())
		}
		else {			
			bound.setLength(width.getValue())
			bound.setWidth(length.getValue())
			placement.setLength(width.getValue() - 2 * rack.getAddendum())
			placement.setWidth(length.getValue())
		}
	}

	rack.getToothedFace = function() {
		return toothedFace
	}

	rack.generateSupport = function() {
		checkFullySpecified()
		var support = new RackSupport()
		support.setLength(length.getValue())
		support.getLengthConstrainable().sameAs(length)
		support.setWidth(width.getValue())
		support.getWidthConstrainable().sameAs(width)
		support.setCentre(rack.getCentre())
		support.setWallHeight(rack.getHeight().getValue())
		support.setWallWidth(rack.getAddendum())
		support.setToothedFace(toothedFace)
		createWallCentre(support)
		return support
	}

	var createWallCentre = function(support) {
		var width = rack.getWidth().getValue()
		var z = 0
		var x, y
		switch(toothedFace) {
			case "Front":
				x = 0
				y = width / 2 - rack.getAddendum() / 2
				break;
			case "Back":
				x = 0
				y = - width / 2 + rack.getAddendum() / 2
				break;
			case "Left":
				y = 0
				x = - width / 2 + rack.getAddendum() / 2
				break;
			case "Right":
				y = 0
				x = width / 2 - rack.getAddendum() / 2
				break;
		}

		support.setWallCentre(x, y, z)
	}

	var checkFullySpecified = function() {
		if(rack.getWidth().isNotSet()) throw "Width not set"
		if(rack.getCentre().isNotFullyDefined()) throw "Point not fully defined"
		if(rack.getHeight().isNotSet()) throw "Height not set"
		if(rack.getLength().isNotSet()) throw "Length not set"
		if(rack.getLinearPitch() == null) throw "Linear pitch not set"
	}

	rack.generateAuxillaryComponents = function() {
		return [rack.generateSupport()]
	}

	rack.toSpecification = function() {
		rack.checkIsValid()
		return new RackSpecification(rack)
	}

	rack._componentToString = rack.toString

	rack.toString = function() {
		var string = rack._componentToString().replace('}', '')
		string += '\tNumber of teeth: ' + rack.getNumberOfTeeth().getValue() + '\n\t'
		string += 'Height: ' + rack.getHeight().getValue() + '\n\t'
		string += 'Width: ' + width.getValue() + '\n\t'
		string += 'Length: ' + length.getValue() + '\n\t'
		string += 'Pressure angle: ' + rack.getPressureAngle().getValue() + '\n\t'
		string += 'Centre point: ' + rack.getCentre().toString() + '\n'
		string += '}'
		return string
	}

	return rack
}