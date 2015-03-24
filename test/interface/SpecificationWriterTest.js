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
 * Tests the SpecificationWriter, which should translate Component 
 * Specifications into Specifications that are understandable by the 3D Drawer.
 */

var should = require('should');
var fs = require('fs');
var Configuration = require(__dirname + '/../Config.js');
var srcPath = __dirname + '/../../src';
var SpecificationWriter = require(srcPath + '/interface/SpecificationWriter.js').SpecificationWriter
var PlaceableComponentTest = require(__dirname + '/../component/PlaceableComponentTest.js')
var PlaceableComponentGroup = require(srcPath + '/component/PlaceableComponentGroup.js').PlaceableComponentGroup

module.exports.shouldWriteSpecificationsToFile = shouldWriteSpecificationsToFile

describe('SpecificationWriter', function() {
	var writer, component
	var specFile = Configuration.specFileTarget

	beforeEach(function(){
		writer = new SpecificationWriter(specFile)
		component = PlaceableComponentTest.createFullySpecifiedTestComponent()
	})

	describe('#addAllComponents', function() {
		it('should add new Specifications to the SpecificationWriter', function() {
			writer.getSpecifications().length.should.equal(0)
			writer.addAllComponents([component])
			writer.getSpecifications().length.should.equal(1)
		})
	})

	describe('#writeSpecificationToFile', function() {
		function writeToFile() {
			writer.writeSpecificationToFile()
		}

		function addComponents(components) {
			writer.addAllComponents(components)
		}

		it('should write the OpenJSCAD Specification to a file', function() {
			shouldWriteSpecificationsToFile(writeToFile, addComponents, specFile)
		})
	})
})

function shouldWriteSpecificationsToFile(writeFunction, 
	                                       addComponentsFunction,
	                                       specFile) {
	describe('Anything calling SpecificationWriter#writeSpecificationToFile',
	         function() {
		var fileContents, component

		beforeEach(function() {			
			component = PlaceableComponentTest.createFullySpecifiedTestComponent() 
		})		

		function writeToFileAndGetContents(fileName, done) {
			if (fs.existsSync(fileName))
				fs.unlinkSync(fileName)			
				writeFunction()
				fs.readFile(fileName, 'utf8', function(err, data) { 
				fileContents = data
				done()
			})
		}

		describe('the generated Specification file', function() {
			beforeEach(function(done) {
				writeToFileAndGetContents(specFile, done)
			})

			it('should write to the file ' + specFile, function() {
				fs.exists(specFile, function(exists) {
					exists.should.be.true;
				})
			})

			it('should include a header to allow the file to be used as an OpenJSCAD '
			   + 'library', function() {
			  var libraryHeader = 'Specification = function() {};\n\n'
			  fileContents.should.containEql(libraryHeader)
			})

			it('should contain a prefix to allow OpenJSCAD access to the array of '
				 + 'Specifications', function() {
				var componentsPrefix = 'Specification.components = ['
				fileContents.should.containEql(componentsPrefix)
			})

			it('should contain a suffix for the array of ComponentSpecifications so that it '
				 + 'is well-formed OpenJSCAD', function() {
				fileContents.should.containEql('];')
			})

			describe('with two ComponentSpecifications added', function() {
				var otherComponent

				beforeEach(function(done) { 
					otherComponent = PlaceableComponentTest.createFullySpecifiedTestComponent(10, 20, 30)
					addComponentsFunction([component, otherComponent])
					writeToFileAndGetContents(specFile,done)
				})

				it('should contain a pretty-printed JSON String for both '
					 + 'ComponentSpecifications in an array', function() {
					var array = [component.toSpecification(), 
					 	           otherComponent.toSpecification()]
					fileContents.should.containEql(JSON.stringify(array, null, 2))
				})
			})					
		})
	})
}
