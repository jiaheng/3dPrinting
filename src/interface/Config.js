/*
 * The locations of the OpenJSCAD files for drawing components
 * 
 * ADD TO THIS LIST IF ADDING DIFFERENT SOURCE DIRECTORIES FOR 3D DRAWER 
 * COMPONENTS
 */
exports.jscadComponentDirectories = [ __dirname + '/../drawer' ]

/*
 * The locations of all files that are necessary for the execution of the 3D
 * Drawer.
 */
exports.sourceDir = [ __dirname + '/../drawer', __dirname + '/../gearFramework/3dDrawer']
// .concat(exports.jscadComponentDirectories)

/*
 * The directory that should be populated with all the OpenJSCAD files when the
 * program executes successfully. These are the files that are used to generate
 * the 3D CAD product.
 */
exports.targetDir = './application_output/'

/*
 * The target location of the Specification file
 */
exports.specFileTarget = exports.targetDir + 'Specification.jscad'

/*
 * The target location of the main file (necessary for OpenJSCAD)
 */
exports.mainFileTarget = exports.targetDir + 'main.jscad'
