include("Anchor.jscad")
include("Base.jscad")
include("Circle.jscad")
include("ComponentFactory.jscad")
include("Drawer.jscad")
include("Line.jscad")
include("Rectangle.jscad")
include("Spindle.jscad")
include("Spiral.jscad")
include("Spring.jscad")
include("Utils.jscad")
include("Gear.jscad")
include("GearUtilities.jscad")
include("InvoluteGear.jscad")
include("Rack.jscad")
include("RackSupport.jscad")
include("Spindle.jscad")

function getParameterDefinitions() {
	return [		{ name: 'printerMinRes',
  	  type: 'float',
  	  initial: 1, 
  	  caption: "Minimum printer resolution (mm):" 
  	},
  	{
		  name: 'circleRes',
		  type: 'choice',
		  values: [4, 8, 16, 64],               
		  captions: ["Very low (impractical - for testing)", "Low", "Medium", "High (for printing)"],  
		  caption: 'Resolution of curves:',                           
		  initial: 4                            
		}/*,
  	{
		  name: 'showID',
		  type: 'choice',
		  values: ["No", "Yes"],   // Booleans don't work
		  caption: 'Display Component IDs:',                           
		  initial: "No"                            
		}*/
	,
	{
		name: "show",
		type: "choice",
		values: ["All",6,5,4,3,2,1],
		captions: ["All","Just Component ID #6","Just Component ID #5","Just Component ID #4","Just Component ID #3","Just Component ID #2","Just Component ID #1"],
		caption: "Show: ",
		initial: "All"
	}
];
}

function main(params) {
	return Drawer.drawComponents(params)
}