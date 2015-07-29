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
 * A support for a Rack Component.
 * 
 * edited by Jia Heng Eik
 * update dependency path
 */
var Component = require(__dirname + '/../../component/Component.js').Component
var Rectangle = require(__dirname + '/../../geometry/Rectangle.js').Rectangle
var Point = require(__dirname + '/../../geometry/Point.js').Point
var ConstrainableValue = require(__dirname + '/../../constraint/ConstrainableValue.js').ConstrainableValue
var RackSupportSpecification = require(__dirname + '/../interface/RackSupportSpecification.js').RackSupportSpecification

module.exports.RackSupport = RackSupport

function RackSupport() {
	const DEFAULT_BASE_WIDTH = 1
	var support = new Component(Rectangle)
	var wallHeight = new ConstrainableValue()
	var baseHeight = new ConstrainableValue()
	var toothedFace
	baseHeight.setValue(DEFAULT_BASE_WIDTH)
	var wall = new Rectangle()
	wall.getLengthConstrainable().sameAs(support.getBoundingShape().getLengthConstrainable())
	var wallCentre = wall.getCentre()

	support.getTypeName = function() {
		return "RackSupport"
	}

	support.getLength = support.getBoundingShape().getLength

	support.getLengthConstrainable = support.getBoundingShape().getLengthConstrainable
	
	support.setLength = support.getBoundingShape().setLength
	
	support.getWidth = support.getBoundingShape().getWidth

	support.getWidthConstrainable = support.getBoundingShape().getWidthConstrainable
	
	support.setWidth = support.getBoundingShape().setWidth

	support.getWallWidth = wall.getWidth 

	support.getWallWidthConstrainable = wall.getWidthConstrainable
	
	support.setWallWidth = function(w) {
		wall.setWidth(w)
	}

	support.getWallHeight = function() {
		return wallHeight
	}

	support.setWallHeight = function(h) {
		wallHeight.setValue(h)
	}

	support.getBaseHeight = function() {
		return baseHeight
	}

	support.setBaseHeight = function(h) {
		baseHeight.setValue(h)
	}

	support.setWallCentre = function(x, y, z) {
		wallCentre.setAt(x, y, z)
	}

	support.getWallCentre = function() {
		return wallCentre
	}

	support.toSpecification = function() {
		checkFullySpecified()
		return new RackSupportSpecification(support)
	}

	support.getToothedFace = function() {
		return toothedFace
	}

	support.setToothedFace = function(f) {
		toothedFace = f
	}

	var checkFullySpecified = function() { 
		if (support.getLengthConstrainable().isNotSet()) throw new Error("Length not set")
		if (support.getWidthConstrainable().isNotSet()) throw new Error("Width not set")
		if (support.getBaseHeight().isNotSet()) throw new Error("Base height not set")
		if (support.getWallHeight().isNotSet()) throw new Error("Wall height not set")
		if (support.getWallWidthConstrainable().isNotSet()) throw new Error("Wall width not set")
		if (wall.getCentre().isNotFullyDefined()) 
			throw new Error("Wall centre not fully defined")
		if (toothedFace == null) throw new Error("Toothed face not set")
	}
	
	return support
}