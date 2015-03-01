include("Anchor.jscad")
include("Circle.jscad")
include("ComponentFactory.jscad")
include("Drawer.jscad")
include("Rectangle.jscad")
include("Spiral.jscad")
include("Spring.jscad")
include("Utils.jscad")

function getParameterDefinitions() {
	return [		/*{ name: 'printerMinRes',
  	  type: 'float',
  	  initial: 1, 
  	  caption: "Minimum printer resolution (mm):" 
  	},*/
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
		values: ["All",2,1],
		captions: ["All","Just Component ID #2","Just Component ID #1"],
		caption: "Show: ",
		initial: "All"
	}
];
}

function main(params) {
	return Drawer.drawComponents(params)
}