var test = require('unit.js');
var should = require('should');
var Spring = require(__dirname + '/../../src/component/Spring.js').Spring;
var Anchor = require(__dirname + '/../../src/component/Anchor.js').Anchor;
var BaseFactory = require(__dirname + '/../../src/component/BaseFactory.js').BaseFactory;
var Base = require(__dirname + '/../../src/component/Base.js').Base;

describe('Base', function() {
	var baseFactory;
	var base;
	var spring;
	var anchor;
	
	beforeEach(function() {
		baseFactory = new BaseFactory();
		spring = new Spring();
		anchor = new Anchor();
	})
	
	describe('Testing getter/setter', function() {
		it('get thickness', function() {
			var t = 5;
			baseFactory.setThickness(t);
			should(baseFactory.getThickness()).be.equal(t);
		})
		
		it('set NaN as thickness', function() {
			var t = null;
			var err_msg = 'Thickness must be a number';
			(function() {
				baseFactory.setThickness(t);	
			}).should.throw(err_msg);
		})
		
		it('set negative value as thickness', function() {
			var t = -1;
			var err_msg = 'Thickness must be more than zero';
			(function() {
				baseFactory.setThickness(t);	
			}).should.throw(err_msg);
		})
	})
	/*
	 * TODO: add more test case
	describe('Testing makeBase for components', function() {
		describe('Adding spring', function() {
			it('make base for spring locate at positive coordinate', function() {
				
			})
		})
	})
	*/
})