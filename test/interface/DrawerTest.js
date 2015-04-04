var test = require('unit.js');
var should = require('should');
var Config = require('../Config.js');
var Drawer = require(__dirname + '/../../src/interface/Drawer.js').Drawer;
var Spring = require(__dirname + '/../../src/component/Spring.js').Spring;
var Anchor = require(__dirname + '/../../src/component/Anchor.js').Anchor;

describe('Drawer', function() {
	var drawer;
	
	beforeEach(function() {
		drawer = new Drawer(Config);
	})
	
	it('add components', function() {
		var spring = new Spring();
		var anchor = new Anchor();
		var components;
		drawer.addComponent(spring);
		drawer.addComponent(anchor);
		components = drawer.getComponents();
		components.should.containEql(anchor);
		components.should.containEql(spring);
	})
	
	it('add component array', function() {
		var spring = new Spring();
		var anchor = new Anchor();
		var components = [];
		var result;
		components.push(spring);
		components.push(anchor);
		drawer.addAllComponents(components);
		result = drawer.getComponents();
		result.should.containEql(anchor);
		result.should.containEql(spring);
	})
	// TODO: generate all files
	// TODO: check collision
	
})
