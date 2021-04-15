var cm;
var svg = "";
var layers;
$(function () {
	cm = CodeMirror.fromTextArea(editor, {
		lineNumbers: true,
		styleActiveLine: true,
	});
	cm.setValue(example.data[0]);
	updatePreview(cm.getValue());
	cm.on('change', function () {
		initializeDrawSettings();
		updatePreview(cm.getValue());
	});
});

function initializeDrawSettings() {
	let settings = "";

	let inputColor = $('#input15').val();
	let inputOpacity = $('#input16').val();

	let cubeColor = $('#input1').val();
	let cubeOpacity = $('#input2').val();

	let kernelColor = $('#input3').val();
	let kernelOpacity = $('#input4').val();

	let denseColor = $('#input5').val();
	let denseOpacity = $('#input6').val();

	let pyramidColor = $('#input7').val();
	let pyramidOpacity = $('#input8').val();

	let arrowColor = $('#input9').val();
	let arrowOpacity = $('#input10').val();

	settings += 'var color = new Color("' + inputColor + '","' + cubeColor + '","' + kernelColor + '","' + denseColor + '","' + pyramidColor + '","' + arrowColor + '","' + inputOpacity + '","'+ cubeOpacity + '","' + kernelOpacity + '","' + pyramidOpacity + '","' + arrowOpacity + '","' + denseOpacity + '");\n';
	let strokeColor = $('#input11').val();
	let strokeWidth = $('#input12').val();

	settings += 'var stroke = new Stroke("' + strokeColor + '","' + strokeWidth + '");\n';

	let xAxis = $('#input17').val();
	let yAxis = $('#input18').val();
	let zAxis = $('#input19').val();

	settings += 'var alfa = new Alfa(' + xAxis + ',' + yAxis + ',' + zAxis + ');\n';

	let fontColor = $('#input13').val();
	let fontSize = $('#input14').val();
	let fontFamily = $('#fontButton').text();
	settings += 'var font = new Font(' + fontSize + ',"' + fontFamily + '","' + fontColor + '");\n';

	let nodesDistance = $('#input20').val();
	let layersDistance = $('#input21').val();
	let parentsDistance = $('#input22').val();
	settings += 'var shift = new Shift(' + nodesDistance + ',' + layersDistance + ',' + parentsDistance + ');\n';
	settings += 'var viewBox = new ViewBox(3000,2000,' + (zoom - 100) + ');\n';

	let cubeDimensions = ($('input:radio[name=cubedimensions]:checked').val() == 'true');
	let kernelDimensions = ($('input:radio[name=kerneldimensions]:checked').val() == 'true');
	let widthLogs = ($('input:radio[name=widthlogs]:checked').val() == 'true');
	let depthtLogs = ($('input:radio[name=depthlogs]:checked').val() == 'true');

	settings += 'var drawSettings = new DrawSettings(color,alfa,shift,font,stroke,viewBox,' + depthtLogs + ',' + widthLogs + ',' + cubeDimensions + ',' + kernelDimensions + ');\n';
	settings += 'var model = new Model();\n';
	settings += 'var svgController = new SvgController(drawSettings)\n';
	settings += 'var layers = new Layers(drawSettings);\n';
	let color = new Color(inputColor,cubeColor, kernelColor, denseColor, pyramidColor, arrowColor,inputOpacity, cubeOpacity, kernelOpacity, pyramidOpacity, arrowOpacity, denseOpacity);
	let alfa = new Alfa(xAxis, yAxis, zAxis);
	let shift = new Shift(nodesDistance, layersDistance, parentsDistance);
	let font = new Font(fontSize, fontFamily, fontColor);
	let stroke = new Stroke(strokeColor, strokeWidth);
	let viewBox = new ViewBox(3000, 2000, 0)
	layers = new Layers(new DrawSettings(color, alfa, shift, font, stroke, viewBox, depthtLogs, widthLogs, cubeDimensions, kernelDimensions));
	return settings;
}

function updatePreview(content) {
	try {
		let settings = initializeDrawSettings();
		var svgID = document.getElementById('svg');
		if (content.includes('model')) {
			let code = settings + content;
			eval(code);
			svg = svgController.draw(model.getModelTree());
			svgID.innerHTML = svg;

		}
		else {
			svgID.innerHTML = content;
		}
		$('#svg').css('background-color', "");
		$('#svg').css('color', "");
		$('#svg').css('font-size', "");
		$('#preview').css('border', '2px solid #1b6181');
		$('text').css("fill",layers.getDrawSettings().getFont().getFont_color());
		$('text').css("font-size",layers.getDrawSettings().getFont().getFont_size());
		$('text').css("font-family",layers.getDrawSettings().getFont().getFont_family());
		$(function () {
			$("#svgImage").draggable();
			$("#svgImage").on("mouseover", function () {
				$('#svgImage').css('cursor', "all-scroll");
			});
		});
	} catch (e) {
		svgID.innerHTML = e;
		$('#svg').css('background-color', "rgba(228, 122, 36, 0.2)");
		$('#svg').css('color', "#ce0f0f");
		$('#svg').css('font-size', "30px");
		$('#preview').css('border', '2px solid #ce0f0f');
	}
}

var example = {
	data: [
		'<!-- Part 1: Nodes Definition -->\n\nvar n1 = new Node();\n\n<!-- Part 2: Neural Network -->\n\n' + 'n1.add(Input(48,32,10));\n' + 'n1.add(Conv2D(32, [10,10], [1,1], "same"));\n'
		+ 'MaxPooling2D([2,2]);\n' + 'n1.add(Conv2D(64,[5,5],[1,1],"same"));\n' + 'MaxPooling2D([2,2]);\n' + 'n1.add(Conv2D(72,[10,10],[1,1],"same"));\n'
		+ 'n1.add(Dense(200));\n' + 'n1.add(Dense(300));\n' +'\n\n<!-- Part 3: Model Definition-->\n\n' + 'model.add(n1);',

		'<!-- Part 1: Nodes Definition -->\n' + '\n' + 'var n1 = new Node();\n' + 'var n2 = new Node();\n' + 'var n3 = new Node();\n' + '\n' + '\n' + '<!-- Part 2: Neural Network -->\n' + '\n' +
		'n1.add(Input(48,32,10));\n' + 'n1.add(Conv2D(32, [10,10], [1,1], "same"));\n' + 'MaxPooling2D([2,2]);\n' + 'n1.add(Conv2D(64,[5,5],[1,1],"same"));\n' + 'MaxPooling2D([2,2]);\n' + 'n1.add(Conv2D(72,[10,10],[1,1],"same"));\n' + '\n' +
		'n2.add(Input(48,32,10));\n' + 'n2.add(Conv2D(32, [10,10], [1,1], "same"));\n' + 'MaxPooling2D([2,2]);\n' + 'n2.add(Conv2D(64,[5,5],[1,1],"same"));\n' + 'MaxPooling2D([2,2]);\n' + 'n2.add(Conv2D(72,[10,10],[1,1],"same"));\n' + '\n' +
		'DenseLayer();\n' + 'n3.add(Concatenate([n1,n2]));\n' + 'n3.add(Dense(200));\n' + 'n3.add(Dense(200));\n' + '\n' + '\n' + '<!-- Part 3: Model Definition-->\n' + '\n' + 'model.add(n3);\n' +
		'model.add(n1,n3);\n' +
		'model.add(n2,n3);\n' +
		'         \n',

		'<!-- Part 1: Nodes Definition -->\n' + '\n' + 'var n1 = new Node();\n' + 'var n2 = new Node();\n' + 'var n3 = new Node();\n' + 'var n4 = new Node();\n' + 'var n5 = new Node();\n' + 'var np = new Node();\n' +'\n' + '\n' + 
		'<!-- Part 2: Neural Network -->\n' + '\n' + 'n1.add(Input(48,32,10));\nn1.add(Conv2D(32, [10,10], [1,1], \"same\"));\nMaxPooling2D([2,2]);\n'+
		'n1.add(Conv2D(64,[5,5],[1,1],\"same\"));\nMaxPooling2D([2,2]);\nn1.add(Conv2D(72,[10,10],[1,1],\"same\"));\n\nn2.add(Input(48,32,10));\n'+
		'n2.add(Conv2D(32, [10,10], [1,1], \"same\"));\nMaxPooling2D([2,2]);\nn2.add(Conv2D(64,[5,5],[1,1],\"same\"));\nMaxPooling2D([2,2]);\nn2.add(Conv2D(72,[10,10],[1,1],\"same\"));\n\n'+
		'n3.add(Input(48,32,10));\nn3.add(Conv2D(32, [10,10], [1,1], \"same\"));\nMaxPooling2D([2,2]);\nn3.add(Conv2D(64,[5,5],[1,1],\"same\"));\nMaxPooling2D([2,2]);\n'+
		'n3.add(Conv2D(72,[10,10],[1,1],\"same\"));\n\nn4.add(Input(48,32,10));\nn4.add(Conv2D(32, [10,10],[1,1], \"same\"));\nMaxPooling2D([2,2]);\nn4.add(Conv2D(64,[5,5],[1,1],\"same\"));\n'+
		'MaxPooling2D([2,2]);\nn4.add(Conv2D(72,[10,10],[1,1],\"same\"));\n\nn5.add(layers.Input(new Cube(new Coordinate(48,32,10),drawSettings)));\nn5.add(layers.Conv2D(32, new Tuple(10, 10), new Tuple(1, 1), \"same\"));\nlayers.MaxPooling2D(new Tuple(2,2));\nn5.add(layers.Conv2D(64,new Tuple(5,5),new Tuple(1,1),\"same\"));\n'+
		'MaxPooling2D([2,2]);\nn5.add(Conv2D(72,[10,10],[1,1],\"same\"));\n\nDenseLayer();\nnp.add(Concatenate([n1,n2,n3,n4,n5]));\nnp.add(Dense(200));\nnp.add(Dense(300));\n\n'+
		'<!-- Part 3: Model Definition-->\n\n' +
		'model.add(np);\nmodel.add(n1,np);\nmodel.add(n2,np);\nmodel.add(n3,np);\nmodel.add(n4,np);\nmodel.add(n5,np);',
		
		'<!-- Part 1: Nodes Definition -->\n' + '\n' + 'var x1a = new Node();\n' + 'var x1b = new Node();\n' + 'var x3a = new Node();\n' + 'var x3b = new Node();\n' + 'var x1 = new Node();\n' + 'var x2 = new Node();\n' + 'var x3 = new Node();\n'+ 'var xp1 = new Node();\n' 
		+ 'var xp2 = new Node();\n'+ 'var xp3 = new Node();\n'+ 'var x5 = new Node();\n'+ 'var x6 = new Node();\n'+ 'var x7 = new Node();\n'+'\n' + '\n' + 
 		'<!-- Part 2: Neural Network -->\n\n' + 'x1a.add(Input(32,32,20));\nx1a.add(Conv2D(32, [10, 10], [1, 1], \"same\"));\nMaxPooling2D([2,2]);\nx1a.add(Conv2D(64, [5,5], [1,1], \"same\"));\n\nx1b.add(Input(32,32,20));\nx1b.add(Conv2D(32, [10, 10], [1, 1], \"same\"));\n'+
		 'MaxPooling2D([2,2]);\nx1b.add(Conv2D(64, [5,5], [1,1], \"same\"));\n\nx2.add(Input(32,32,20));\nx2.add(Conv2D(32, [10, 10], [1, 1], \"same\"));\nMaxPooling2D([2,2]);\nx2.add(Conv2D(64, [5,5], [1,1], \"same\"));\nMaxPooling2D([2,2]);\nx2.add(Conv2D(64, [5,5], [1,1], \"same\"));\n\n'+
		 'x3a.add(Input(32,32,20));\nx3a.add(Conv2D(32, [10, 10], [1, 1], \"same\"));\nMaxPooling2D([2,2]);\nx3a.add(Conv2D(64, [5, 5], [1, 1], \"same\"));\n\nx3b.add(Input(32,32,20));\nx3b.add(Conv2D(32, [10, 10], [1, 1], \"same\"));\nMaxPooling2D([2,2]);\nx3b.add(Conv2D(64, [5, 5], [1, 1], \"same\"));\n\n'+
		 'x5.add(Input(32,32,20));\nx5.add(Conv2D(32, [10, 10], [1, 1], \"same\"));\nMaxPooling2D([2,2]);\nx5.add(Conv2D(64, [5, 5], [1, 1], \"same\"));\nlayers.MaxPooling2D(new Tuple(2, 2));\nx5.add(Conv2D(64, [5, 5], [1, 1], \"same\"));\nx5.add(Conv2D(100, [5, 5], [1, 1], \"same\"));\n\nx6.add(Input(32,32,20));\nx6.add(Conv2D(32, [10, 10], [1, 1], \"same\"));\n'+
		 'MaxPooling2D([2,2]);\nx6.add(Conv2D(64, [5, 5], [1, 1], \"same\"));\nlayers.MaxPooling2D(new Tuple(2, 2));\nx6.add(Conv2D(64, [5, 5], [1, 1], \"same\"));\nx6.add(Conv2D(100, [5, 5], [1, 1], \"same\"));\n\nx1.add(Concatenate([x1a, x1b]));\nMaxPooling2D([2,2]);\nx1.add(Conv2D(64, [5, 5], [1, 1], \"same\"));\n\nx3.add(Concatenate([x3a, x3b]));\n'+
		 'MaxPooling2D([2,2]);\nx3.add(Conv2D(64, [5, 5], [1, 1], \"same\"));\nx3.add(Conv2D(64, [5, 5], [1, 1], \"same\"));\nx3.add(Conv2D(100, [5, 5], [1, 1], \"same\"));\n\nxp1.add(Concatenate([x1, x2]));\nxp1.add(Conv2D(64, [5, 5], [1, 1], \"same\"));;\nxp1.add(Conv2D(64, [5, 5], [1, 1], \"same\"));;\nxp1.add(Conv2D(100, [5, 5], [1, 1], \"same\"));;\n\nxp2.add(Concatenate([xp1, x3]));\n'+
		 'xp2.add(Conv2D(64, [5, 5], [1, 1], \"same\"));\n\nx7.add(Concatenate([x5,x6]));\nMaxPooling2D([2, 2]);\nx7.add(Conv2D(64, [5, 5], [1, 1], \"same\"));\n\nDenseLayer();\nxp3.add(Concatenate([xp1,x3,x5]));\nxp3.add(Dense(200));\nxp3.add(Dense(300));\n\n'+
		 '<!-- Part 3: Model Definition-->\n\n' +'model.add(xp3);\nmodel.add(x1a, x1);\nmodel.add(x1b, x1);\nmodel.add(x1, xp1);\nmodel.add(x2, xp1);\nmodel.add(x3a,x3);\nmodel.add(x3b,x3);\nmodel.add(x5,x7);\nmodel.add(x6,x7);\nmodel.add(xp1,xp2);\nmodel.add(x3,xp2);\n\nmodel.add(xp2,xp3);\nmodel.add(x7,xp3);'
	],
	init: function (number) {
		cm.setValue(example.data[number]);
	},
}

function doText(number) {
	return example.data[number];
}

/*COORDINATE CLASS*/
class Coordinate {
	constructor(x, y, z) {
		this.coordinateMatrix = (function (dims) {
			var allocate = function (dims) {
				if (dims.length === 0) {
					return 0;
				} else {
					var array = [];
					for (var i = 0; i < dims[0]; i++) {
						array.push(allocate(dims.slice(1)));
					}
					return array;
				}
			};
			return allocate(dims);
		})([3, 1]);
		this.coordinateMatrix[0][0] = x;
		this.coordinateMatrix[1][0] = y;
		this.coordinateMatrix[2][0] = z;
	}
	getX() {
		return this.coordinateMatrix[0][0];
	}
	getY() {
		return this.coordinateMatrix[1][0];
	}
	getZ() {
		return this.coordinateMatrix[2][0];
	}
	setX(x) {
		this.coordinateMatrix[0][0] = x;
	}
	setY(y) {
		this.coordinateMatrix[1][0] = y;
	}
	setZ(z) {
		this.coordinateMatrix[2][0] = z;
	}
	getCoordinateMatrix() {
		return this.coordinateMatrix;
	}
}

/*TUPLE CLASS*/
class Tuple {
	constructor(n1, n2) {
		this.n1 = n1;
		this.n2 = n2;
	}

	getN1() {
		return this.n1;
	}
	getN2() {
		return this.n2;
	}
}

/*ALFA CLASS*/
class Alfa {
	constructor(alfaX, alfaY, alfaZ) {
		this.alfaX = alfaX;
		this.alfaY = alfaY;
		this.alfaZ = alfaZ;
	}

	getAlfaX() {
		return this.alfaX;
	}
	getAlfaY() {
		return this.alfaY;
	}
	getAlfaZ() {
		return this.alfaZ;
	}
}

/*COLOR CLASS*/
class Color {
	constructor(input,cube, kernel, dense, pyramid, arrow, inputOpacity, layerOpacity, kernelOpacity, convOpacity, arrowOpacity, denseOpacity) {
		this.inputColor = input;
		this.cubeColor = cube;
		this.kernelColor = kernel;
		this.denseColor = dense;
		this.pyramidColor = pyramid;
		this.arrowColor = arrow;
		this.inputOpacity = inputOpacity;
		this.layerOpacity = layerOpacity;
		this.kernelOpacity = kernelOpacity;
		this.convOpacity = convOpacity;
		this.arrowOpacity = arrowOpacity;
		this.denseOpacity = denseOpacity;
	}
	getInputColor() {
		return this.inputColor;
	}
	getCubeColor() {
		return this.cubeColor;
	}
	getKernelColor() {
		return this.kernelColor;
	}
	getDenseColor() {
		return this.denseColor;
	}
	getPyramidColor() {
		return this.pyramidColor;
	}
	getArrowColor() {
		return this.arrowColor;
	}
	getInputOpacity() {
		return this.inputOpacity;
	}
	getLayerOpacity() {
		return this.layerOpacity;
	}
	getKernelOpacity() {
		return this.kernelOpacity;
	}
	getConvOpacity() {
		return this.convOpacity;
	}
	getArrowOpacity() {
		return this.arrowOpacity;
	}
	getDenseOpacity() {
		return this.denseOpacity;
	}
}

/*FONT CLASS*/
class Font {
	constructor(font_size, font_family, font_color) {
		this.font_size = font_size;
		this.font_family = font_family;
		this.font_color = font_color;
	}
	getFont_size() {
		return this.font_size;
	}
	getFont_family() {
		return this.font_family;
	}
	getFont_color() {
		return this.font_color;
	}
}

/*SHIFT CLASS*/
class Shift {
	constructor(shiftNodes, shiftLayers, shiftParent) {

		this.shiftNodes = shiftNodes;
		this.shiftLayers = shiftLayers;
		this.shiftParent = shiftParent;
	}
	getShiftLayers() {
		return this.shiftLayers;
	}
	getShiftNodes() {
		return this.shiftNodes;
	}
	getShiftParent() {
		return this.shiftParent;
	}
}

/*STROKE CLASS*/
class Stroke {
	constructor(stroke_color, stroke_width) {
		this.stroke_color = stroke_color;
		this.stroke_width = stroke_width;
	}
	getStroke_color() {
		return this.stroke_color;
	}
	getStroke_width() {
		return this.stroke_width;
	}
}

/*VIEWBOX CLASS */
class ViewBox {
	constructor(width, height, zoom) {
		this.width = width;
		this.height = height;
		this.zoom = -zoom;
	}
	getWidth() {
		return this.width;
	}
	getHeight() {
		return this.height;
	}
	getZoom() {
		return this.zoom;
	}
}
/*DRAW SETTINGS */
class DrawSettings {
	constructor(color, alfa, shift, font, stroke, viewBox, activateDepthLogs, activateWidhtLogs, activateLayerDimensions, activateKernelDimensions) {
		this.color = color;
		this.alfa = alfa;
		this.shift = shift;
		this.font = font;
		this.stroke = stroke;
		this.viewBox = viewBox;
		this.activateDepthLogs = activateDepthLogs;
		this.activateWidhtLogs = activateWidhtLogs;
		this.activateLayerDimensions = activateLayerDimensions;
		this.activateKernelDimensions = activateKernelDimensions;
	}
	getColor() {
		return this.color;
	}
	getAlfa() {
		return this.alfa;
	}
	getShift() {
		return this.shift;
	}
	getFont() {
		return this.font;
	}
	getStroke() {
		return this.stroke;
	}
	getViewBox() {
		return this.viewBox;
	}
	isActivateLayerDimensions() {
		return this.activateLayerDimensions;
	}
	isActivateKernelDimensions() {
		return this.activateKernelDimensions;
	}
	logWidth(num) {
		if (this.activateWidhtLogs) {
			return Math.log(num) / Math.log(2);
		}
		return num;
	}
	logDepth(num) {
		if (this.activateDepthLogs) {
			return Math.log(num) / Math.log(2);
		}
		return num;
	}
}

/*LAYERS CLASS */
class Layers {
	constructor(drawSettings) {
		this.cube_actual = new Cube();
		this.drawSettings = drawSettings;
		this.denseLayer = false;
	}
	Input(input) {
		let cubeList = new Array();
		input.isInputLayer = true;
		this.cube_actual = input;
		cubeList.push(input);
		return cubeList;
	}
	Conv2D$4(filters, kernel_size, strides, padding) {
		let cubeList = new Array();
		let CNNCube = this.createKernel(this.cube_actual.getZ(), kernel_size);
		cubeList.push(CNNCube);
		this.setConvolution(filters, kernel_size, strides, padding);
		cubeList.push(this.cube_actual);
		return cubeList;
	}
	Conv2D$5(filters, kernel_size, strides, input, padding) {
		let cubeList = new Array();
		this.cube_actual = input;
		cubeList.push(input);
		let CNNCube = this.createKernel(this.cube_actual.getZ(), kernel_size);
		cubeList.push(CNNCube);
		this.setConvolution(filters, kernel_size, strides, padding);
		cubeList.add(this.cube_actual);
		return cubeList;
	}
	Conv2D(...args$) {
		switch (args$.length) {
			case 4:
				return this.Conv2D$4(...args$);
			case 5:
				return this.Conv2D$5(...args$);
		}
	}
	MaxPooling2D(tuple) {
		this.setPooling(tuple);
	}
	Dense(vector) {
		let cubeList = new Array();
		let cube = new Cube(new Coordinate(10, vector, 10), this.drawSettings);
		cube.setDenseLayer(true);
		this.cube_actual = cube;
		cubeList.push(cube);
		return cubeList;
	}
	concatenate(nodes) {
		if (this.denseLayer) {
			return new Array();
		}
		let x = 0;
		let y = 0
		let z = 0;

		for (let n of nodes) {
			x += n.getLastCube().getX();
			y += n.getLastCube().getY();
			z += n.getLastCube().getZ();
		}
		let cubeList = new Array();
		let newCube = new Cube(new Coordinate(x, y, z), this.drawSettings);
		cubeList.push(newCube);
		this.cube_actual = newCube;
		return cubeList;
	}
	setDenseLayer(denseLayer) {
		this.denseLayer = denseLayer;
	}
	setPooling(tuple) {
		let x = (this.cube_actual.getX()) / tuple.getN1();
		let y = (this.cube_actual.getY()) / tuple.getN2();
		this.setNewDimensions(x, y, this.cube_actual.getZ());
	}
	setConvolution(filters, kernel_size, strides, padding) {
		let output_w = this.cube_actual.getX();
		let output_h = this.cube_actual.getY();
		if (strides !== null && padding !== null) {
			if (padding == 'valid') {
				output_w = (this.cube_actual.getX() - kernel_size.getN1() + 1) / strides.getN1();
				output_h = (this.cube_actual.getY() - kernel_size.getN2() + 1) / strides.getN2();
			}
			if (padding == 'same') {
				output_w = (this.cube_actual.getX()) / strides.getN1();
				output_h = (this.cube_actual.getY()) / strides.getN2();
			}
		}
		this.setNewDimensions(output_w, output_h, filters);
	}
	createKernel(z, tuple) {
		let coordinates = new Coordinate(tuple.getN1(), tuple.getN2(), z);
		let kernel = new Cube(coordinates, this.drawSettings);
		kernel.setKernel(true);
		return kernel;
	}
	setNewDimensions(x, y, z) {
		let coordinate = new Coordinate(x, y, z);
		this.cube_actual = new Cube(coordinate, this.drawSettings);
	}
	getDrawSettings() {
		return this.drawSettings;
	}
}

function Input(x, y, z) {
	return layers.Input(new Cube(new Coordinate(x, y, z), layers.getDrawSettings()));
}

function Conv2D(filters, kernel, strides, padding) {
	return layers.Conv2D(filters, new Tuple(kernel[0], kernel[1]), new Tuple(strides[0], strides[1]), padding);
}

function MaxPooling2D(tuple) {

	return layers.MaxPooling2D(new Tuple(tuple[0], tuple[1]));
}

function Dense(vector) {
	return layers.Dense(vector);
}

function Concatenate(nodes) {
	return layers.concatenate(nodes);
}

function DenseLayer() {
	layers.setDenseLayer(true);
}

/*MATRICES*/
class RotationMatrixX {
	constructor(alfa) {
		this.initializeMatrix(alfa);
	}
	initializeMatrix(alfa) {
		this.matrix = (function (dims) {
			var allocate = function (dims) {
				if (dims.length === 0) {
					return 0;
				} else {
					var array = [];
					for (var i = 0; i < dims[0]; i++) {
						array.push(allocate(dims.slice(1)));
					}
					return array;
				}
			};
			return allocate(dims);
		})([3, 3]);
		this.matrix[0][0] = 1;
		this.matrix[1][0] = 0;
		this.matrix[2][0] = 0;

		this.matrix[0][1] = 0;
		this.matrix[1][1] = Math.cos(alfa * (Math.PI / 180));
		this.matrix[2][1] = Math.sin(alfa * (Math.PI / 180));

		this.matrix[0][2] = 0;
		this.matrix[1][2] = -(Math.sin(alfa * (Math.PI / 180)));
		this.matrix[2][2] = Math.cos(alfa * (Math.PI / 180));
	}
	getMatrix() {
		return this.matrix;
	}
}

class RotationMatrixY {
	constructor(alfa) {
		this.initializeMatrix(alfa);
	}
	initializeMatrix(alfa) {
		this.matrix = (function (dims) {
			var allocate = function (dims) {
				if (dims.length === 0) {
					return 0;
				} else {
					var array = [];
					for (var i = 0; i < dims[0]; i++) {
						array.push(allocate(dims.slice(1)));
					}
					return array;
				}
			};
			return allocate(dims);
		})([3, 3]);
		this.matrix[0][0] = Math.cos(alfa * (Math.PI / 180));
		this.matrix[1][0] = 0;
		this.matrix[2][0] = -(Math.sin(alfa * (Math.PI / 180)));

		this.matrix[0][1] = 0;
		this.matrix[1][1] = 1;
		this.matrix[2][1] = 0;

		this.matrix[0][2] = Math.sin(alfa * (Math.PI / 180));
		this.matrix[1][2] = 0;
		this.matrix[2][2] = Math.cos(alfa * (Math.PI / 180));
	}
	getMatrix() {
		return this.matrix;
	}
}

class RotationMatrixZ {
	constructor(alfa) {
		this.initializeMatrix(alfa);
	}
	initializeMatrix(alfa) {
		this.matrix = (function (dims) {
			var allocate = function (dims) {
				if (dims.length === 0) {
					return 0;
				} else {
					var array = [];
					for (var i = 0; i < dims[0]; i++) {
						array.push(allocate(dims.slice(1)));
					}
					return array;
				}
			};
			return allocate(dims);
		})([3, 3]);
		this.matrix[0][0] = Math.cos(alfa * (Math.PI / 180));
		this.matrix[1][0] = Math.sin(alfa * (Math.PI / 180));
		this.matrix[2][0] = 0;

		this.matrix[0][1] = -(Math.sin(alfa * (Math.PI / 180)));
		this.matrix[1][1] = Math.cos(alfa * (Math.PI / 180));
		this.matrix[2][1] = 0;

		this.matrix[0][2] = 0;
		this.matrix[1][2] = 0;
		this.matrix[2][2] = 1;
	}
	getMatrix() {
		return this.matrix;
	}
}

/*MATRIX CONTROLLER*/
class MatrixController {
	constructor(alfaX, alfaY, alfaZ) {
		let rotationMatrixX = new RotationMatrixX(alfaX);
		let rotationMatrixY = new RotationMatrixY(alfaY);
		let rotationMatrixZ = new RotationMatrixZ(alfaZ);
		this.matrix = this.multiply(rotationMatrixZ.getMatrix(), rotationMatrixX.getMatrix());
		this.matrix = this.multiply(this.matrix, rotationMatrixY.getMatrix());
	}
	rotate(coordinates) {
		this.setNewCoordinates(coordinates);
	}
	move(axis, coordinates, length) {
		switch (axis) {
			case "x":
				{
					coordinates[0].setX(coordinates[0].getX() + length);
					coordinates[1].setX(coordinates[1].getX() + length);
					coordinates[2].setX(coordinates[2].getX() + length);
					coordinates[3].setX(coordinates[3].getX() + length);
					coordinates[4].setX(coordinates[4].getX() + length);
					coordinates[5].setX(coordinates[5].getX() + length);
					coordinates[6].setX(coordinates[6].getX() + length);
					coordinates[7].setX(coordinates[7].getX() + length);
					coordinates[8].setX(coordinates[8].getX() + length);
					break;
				}
			case "y":
				{
					coordinates[0].setY(coordinates[0].getY() + length);
					coordinates[1].setY(coordinates[1].getY() + length);
					coordinates[2].setY(coordinates[2].getY() + length);
					coordinates[3].setY(coordinates[3].getY() + length);
					coordinates[4].setY(coordinates[4].getY() + length);
					coordinates[5].setY(coordinates[5].getY() + length);
					coordinates[6].setY(coordinates[6].getY() + length);
					coordinates[7].setY(coordinates[7].getY() + length);
					coordinates[8].setY(coordinates[8].getY() + length);
					break;
				}
			case "z":
				{
					coordinates[0].setZ(coordinates[0].getZ() + length);
					coordinates[1].setZ(coordinates[1].getZ() + length);
					coordinates[2].setZ(coordinates[2].getZ() + length);
					coordinates[3].setZ(coordinates[3].getZ() + length);
					coordinates[4].setZ(coordinates[4].getZ() + length);
					coordinates[5].setZ(coordinates[5].getZ() + length);
					coordinates[6].setZ(coordinates[6].getZ() + length);
					coordinates[7].setZ(coordinates[7].getZ() + length);
					coordinates[8].setZ(coordinates[8].getZ() + length);
					break;
				}
		}
	}
	setNewCoordinates(coordinates) {
		let c0 = this.multiply(this.matrix, coordinates[0].getCoordinateMatrix());
		let c1 = this.multiply(this.matrix, coordinates[1].getCoordinateMatrix());
		let c2 = this.multiply(this.matrix, coordinates[2].getCoordinateMatrix());
		let c3 = this.multiply(this.matrix, coordinates[3].getCoordinateMatrix());
		let c4 = this.multiply(this.matrix, coordinates[4].getCoordinateMatrix());
		let c5 = this.multiply(this.matrix, coordinates[5].getCoordinateMatrix());
		let c6 = this.multiply(this.matrix, coordinates[6].getCoordinateMatrix());
		let c7 = this.multiply(this.matrix, coordinates[7].getCoordinateMatrix());
		let c8 = this.multiply(this.matrix, coordinates[8].getCoordinateMatrix());
		coordinates[0] = new Coordinate(c0[0][0], c0[1][0], c0[2][0]);
		coordinates[1] = new Coordinate(c1[0][0], c1[1][0], c1[2][0]);
		coordinates[2] = new Coordinate(c2[0][0], c2[1][0], c2[2][0]);
		coordinates[3] = new Coordinate(c3[0][0], c3[1][0], c3[2][0]);
		coordinates[4] = new Coordinate(c4[0][0], c4[1][0], c4[2][0]);
		coordinates[5] = new Coordinate(c5[0][0], c5[1][0], c5[2][0]);
		coordinates[6] = new Coordinate(c6[0][0], c6[1][0], c6[2][0]);
		coordinates[7] = new Coordinate(c7[0][0], c7[1][0], c7[2][0]);
		coordinates[8] = new Coordinate(c8[0][0], c8[1][0], c8[2][0]);
	}
	multiply(a, b) {
		var c = (function (dims) {
			var allocate = function (dims) {
				if (dims.length === 0) {
					return 0;
				} else {
					var array = [];
					for (var i = 0; i < dims[0]; i++) {
						array.push(allocate(dims.slice(1)));
					}
					return array;
				}
			};
			return allocate(dims);
		})([a.length, b[0].length]);
		for (var i = 0; i < c.length; i++) {
			for (var j = 0; j < c[0].length; j++) {
				for (var k = 0; k < b.length; k++) {
					c[i][j] += a[i][k] * b[k][j];
				};
			};
		}
		return c;
	}
}

/*MODEL CLASS*/
class Model {
	constructor() {
		this.modelTree = new NeuralNetworkTree();
	}
	getModelTree() {
		return this.modelTree;
	}
	add$1(x1) {
		this.modelTree.addRoot(x1);
	}
	add$2(child, parent) {
		this.modelTree.add(child, parent);
	}
	add(...args$) {
		switch (args$.length) {
			case 1:
				return this.add$1(...args$);
			case 2:
				return this.add$2(...args$);
		}
	}
	addJump(n1, n2) {
		let jump = new Array();
		jump.push(n1);
		jump.push(n2);
		this.getModelTree().getJumps().push(jump);
	}
}

/*ARROW CLASS*/
class Arrow {
	constructor(vertex1, vertex2) {
		this.vertex1 = vertex1;
		this.vertex2 = vertex2;
		this.coordinates = new Array();
		this.coordinates.push(new Coordinate(vertex1.getX(), vertex1.getY(), vertex1.getZ()));
		this.coordinates.push(new Coordinate(vertex2.getX(), vertex2.getY(), vertex2.getZ()));
	}
	getCoordinates() {
		return this.coordinates;
	}
	getVertex1() {
		return this.vertex1;
	}
	getVertex2() {
		return this.vertex2;
	}
}

/*CUBE CLASS*/
class Cube {
	constructor$0() { }
	constructor$2(coordinates, drawSettings) {
		this.initializeCube(coordinates, drawSettings);
	}
	constructor(...args$) {
		switch (args$.length) {
			case 0:
				return this.constructor$0(...args$);
			case 2:
				return this.constructor$2(...args$);
		}
	}
	initializeCube(coordinate, drawSettings) {
		this.x = coordinate.getX();
		this.y = coordinate.getY();
		this.z = coordinate.getZ();
		this.isDenseLayer = false;
		this.isKernel = false;
		this.isInputLayer = false;
		let x_aux = drawSettings.logWidth(this.x);
		let y_aux = this.y;
		let z_aux = drawSettings.logDepth(this.z);
		this.coordinates = new Array();
		this.coordinates.push(new Coordinate(-(x_aux / 2), -(y_aux / 2), z_aux / 2));
		this.coordinates.push(new Coordinate(x_aux / 2, -(y_aux / 2), z_aux / 2));
		this.coordinates.push(new Coordinate(-(x_aux / 2), (y_aux / 2), z_aux / 2));
		this.coordinates.push(new Coordinate(x_aux / 2, y_aux / 2, z_aux / 2));
		this.coordinates.push(new Coordinate(-(x_aux / 2), -(y_aux / 2), -(z_aux / 2)));
		this.coordinates.push(new Coordinate(x_aux / 2, -(y_aux / 2), -(z_aux / 2)));
		this.coordinates.push(new Coordinate(-(x_aux / 2), y_aux / 2, -(z_aux / 2)));
		this.coordinates.push(new Coordinate(x_aux / 2, y_aux / 2, -(z_aux / 2)));

		let x_random = Math.random() * (this.coordinates[5].getX() - this.coordinates[4].getX()) + this.coordinates[4].getX();
		let y_random = Math.random() * (this.coordinates[6].getY() - this.coordinates[4].getY()) + this.coordinates[4].getY();
		this.coordinates.push(new Coordinate(x_random, y_random, this.coordinates[4].getZ()));
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	getZ() {
		return this.z;
	}
	isKernel() {
		return this.isKernel;
	}
	setKernel(kernel) {
		this.isKernel = kernel;
	}
	getCoordinates() {
		return this.coordinates
	}
	isDenseLayer() {
		return this.isDenseLayer;
	}
	setDenseLayer(denseLayer) {
		this.isDenseLayer = denseLayer;
	}
}
/*PYRAMID CLASS*/
class Pyramid {
	constructor(coordinates, point) {
		this.initializePyramid(coordinates, point);
	}
	initializePyramid(coordinates, point) {
		this.vertex = new Coordinate(point.getX(), point.getY(), point.getZ());
		this.coordinates = new Array();
		this.coordinates.push(new Coordinate(coordinates[0].getX(), coordinates[0].getY(), coordinates[0].getZ()));
		this.coordinates.push(new Coordinate(coordinates[1].getX(), coordinates[1].getY(), coordinates[1].getZ()));
		this.coordinates.push(new Coordinate(coordinates[2].getX(), coordinates[2].getY(), coordinates[2].getZ()));
		this.coordinates.push(new Coordinate(coordinates[3].getX(), coordinates[3].getY(), coordinates[3].getZ()));
		this.coordinates.push(new Coordinate(point.getX(), point.getY(), point.getZ()));
	}
	getCoordinates() {
		return this.coordinates;
	}
	getVertex() {
		return this.vertex;
	}
}

/*NODE CLASS*/
class Node {
	constructor() {
		this.cubeList = new Array();
		this.lastCube = null;
		this.parent = null;
		this.children = new Array();
	}
	getCubeList() {
		return this.cubeList;
	}
	getLastCube() {
		return this.lastCube;
	}
	setLastCube(lastCube) {
		this.lastCube = lastCube;
	}
	setParent(parent) {
		this.parent = parent;
	}
	getChildren() {
		return this.children;
	}
	getParent() {
		return this.parent;
	}
	add(cubeList) {
		Array.prototype.push.apply(this.cubeList, cubeList);
		if (!this.getCubeList().length == 0) {
			this.setLastCube(this.cubeList[this.getCubeList().length - 1]);
		}
	}
}

/*NEURALNETOWRK TREE*/
class NeuralNetworkTree {
	constructor() {
		this.root = null;
		this.nodes = null;
		this.jumps = new Array();
	}
	isEmpty() {
		return (this.root === null);
	}
	isLeaf(node) {
		return (node.getChildren() === null) || (node.getChildren().length == 0);
	}
	isRoot(node) {
		return (node === this.root);
	}
	getNodes() {
		return this.nodes;
	}
	getJumps() {
		return this.jumps;
	}
	root() {
		if (this.root === null) {
			throw 'The tree is empty';
		}
		return this.root;
	}
	addRoot(node) {
		if (this.isEmpty) {
			this.root = node;
		} else {
			throw 'Tree already has a root';
		}
	}
	add(child, parent) {
		parent.getChildren().push(child);
		child.setParent(parent);
	}
	levels(node, maxDepth) {
		if (node !== null) {
			if (this.isLeaf(node)) {
				if (!this.nodes[maxDepth - 1].includes(node)) {
					this.nodes[maxDepth - 1].push(node);
				}
			} else {
				let level = this.level(node);
				if (!this.nodes[level].includes(node)) {
					this.nodes[level].push(node);
				}
				for (let child of node.getChildren()) {
					this.levels(child, maxDepth);
				}
			}
		}
	}
	maxDepth(root) {
		if (this.root === null) {
			return 0;
		}
		let max = Number.MIN_VALUE;
		for (let child of root.getChildren()) {
			max = Math.max(max, this.maxDepth(child));
		}
		return 1 + Math.max(max, 0);
	}
	level(node) {
		let l = 0;
		while (!this.isParent(node)) {
			node = node.getParent();
			l++;
		}
		return l;
	}
	greaterDepthChild(children) {
		let max = Number.MIN_VALUE;
		for (let child of children) {
			if (child.getLastCube().getCoordinates()[0].getZ() > max) {
				max = child.getLastCube().getCoordinates()[0].getZ();
			}
		}
		return max;
	}
	findLastChild(nodes) {
		let max = Number.MIN_VALUE;
		let lastChild = null;
		for (let node of nodes) {
			let cube = node.getCubeList()[0];
			if (cube.getCoordinates()[1].getX() > max) {
				max = cube.getCoordinates()[1].getX();
				lastChild = node;
			}
		}
		return lastChild;
	}
	findFirstChild(nodes) {
		let min = Number.MAX_VALUE;
		let firstChild = null;
		for (let node of nodes) {
			let cube = node.getCubeList()[0];
			if (cube.getCoordinates()[1].getX() < min) {
				min = cube.getCoordinates()[1].getX();
				firstChild = node;
			}
		}
		return firstChild;
	}
	isParent(node) {
		return node.getParent() === null;
	}
	check() {
		for (let nodes of this.getNodes()) {
			for (let node of nodes) {
				if (node.getCubeList().length == 0 || node.getCubeList() === null) {
					throw 'The neural network has been poorly defined.';
				}
			}
		}
	}
	initializeNodes() {
		let maxDepth = this.maxDepth(this.root);
		this.nodes = new Array();
		for (let i = 0; i < maxDepth; i++) {
			this.nodes.push(new Array());
		}
		this.levels(this.root, maxDepth);
		this.check();
		this.nodes.reverse();
	}
}

/*SVGCONTROLLER CLASS */
class SvgController {
	constructor(settings) {
		this.depth = 0;
		this.depthAux = 0;
		this.length = 0;
		this.lengthAux = 0;
		this.activate = false;
		this.aux = '';
		this.z = 0;
		this.imageCenter = null;
		this.x_max = -Number.MAX_VALUE;
		this.y_max = -Number.MAX_VALUE;
		this.z_max = -Number.MAX_VALUE;
		this.x_min = Number.MAX_VALUE;
		this.y_min = Number.MAX_VALUE;
		this.z_min = Number.MAX_VALUE;
		this.drawOrderList = new Array();
		this.svgString = '';

		this.drawSettings = settings;
		this.matrixController = new MatrixController(this.drawSettings.getAlfa().getAlfaX(), this.drawSettings.getAlfa().getAlfaY(), this.drawSettings.getAlfa().getAlfaZ());
	}
	draw(modelTree) {
		this.shiftTree(modelTree);
		this.calculateImageCenter();
		for (let i = 0; i < modelTree.getNodes().length; i++) {
			for (let j = 0; j < modelTree.getNodes()[i].length; j++) {
				let node = modelTree.getNodes()[i][j];
				this.drawNode(node);
			}
		}
		this.drawUnions(modelTree);
		this.drawJumps(modelTree.getJumps());
		this.drawOrderList.sort((a, b) => (a.getZ() > b.getZ()) ? -1 : 1)
		this.addHeader();
		for (let n of this.drawOrderList) {
			this.svgString += n.getSvgString();
		}
		this.addFooter();
		return this.svgString;
	}
	shiftTree(modelTree) {
		modelTree.initializeNodes();
		for (let i = 0; i < modelTree.getNodes().length; i++) {
			if (i === 0) {
				for (let j = 0; j < modelTree.getNodes()[i].length; j++) {
					let node = modelTree.getNodes()[i][j];
					if (j !== 0) {
						let l = 0;
						if (node.getCubeList()[0].getX() > modelTree.getNodes()[i][j - 1].getCubeList()[0].getX()) {
							l = Math.abs(node.getCubeList()[0].getCoordinates()[0].getX() - this.lengthAux);
						} else {
							l = Math.abs(this.lengthAux - node.getCubeList()[0].getCoordinates()[0].getX());
						}
						this.length += l + this.drawSettings.getShift().getShiftNodes();
					}
					this.lengthAux = node.getCubeList()[0].getCoordinates()[1].getX();
					this.shiftNode(node);
					this.depth = 0;
					this.depthAux = 0;
				}
			} else {
				for (let j = 0; j < modelTree.getNodes()[i].length; j++) {
					let node = modelTree.getNodes()[i][j];
					let firstChild = modelTree.findFirstChild(node.getChildren());
					let lastChild = modelTree.findLastChild(node.getChildren());
					let centerChild1 = this.calculateCenter(firstChild.getCubeList()[0].getCoordinates());
					let centerChild2 = this.calculateCenter(lastChild.getCubeList()[0].getCoordinates());
					this.length = (Math.abs(centerChild1.getX() + centerChild2.getX()) / 2);
					let depth = modelTree.greaterDepthChild(node.getChildren());
					let depthCube = node.getCubeList()[0].getCoordinates()[1].getZ();
					let l = Math.abs(depth + depthCube);
					this.depth = l + this.drawSettings.getShift().getShiftParent();
					this.shiftNode(node);
				}
				this.depth = 0;
				this.depthAux = 0;
			}
			this.length = 0;
		}
	}
	drawNode(node) {
		let modelQueue = node.getCubeList();
		for (let i = 0; i < modelQueue.length; i++) {
			let cube = modelQueue[i];
			this.doTransformations(cube.getCoordinates());
			if (this.activate) {
				let kernelCube = modelQueue[i - 1];
				let vertex = cube.getCoordinates()[8];
				let pyramid = new Pyramid(kernelCube.getCoordinates().slice(0, 4), new Coordinate(vertex.getX(), vertex.getY(), vertex.getZ()));
				this.drawPyramid(pyramid);
				this.activate = false;
			}
			if (i !== modelQueue.length - 1) {
				if (modelQueue[i + 1].isDenseLayer) {
					this.drawSingleCube(cube);
				}
			}
			if (i === modelQueue.length - 1 || cube.isDenseLayer) {
				this.drawSingleCube(cube);
			} else {
				this.drawCube(cube);
			}
			if (cube.isDenseLayer && i != 0) {
				let lastCube = modelQueue[i - 1];
				this.lineTo(lastCube, cube);
			}
			if (cube.isKernel) {
				this.activate = true;
			}
			this.updateMaxMin(cube.getCoordinates());
		}
	}
	drawSingleCube(cube) {
		let color = this.selectColor(cube);
		let opacity = this.selectOpacity(cube);
		let svg = '';
		svg += '\t\t<path opacity=\'' + opacity + '\' fill=\'' + color + '\' d=\'' + 'M' + cube.getCoordinates()[0].getX() + ' ' + cube.getCoordinates()[0].getY() + ' L' + cube.getCoordinates()[1].getX() + ' ' + cube.getCoordinates()[1].getY() + ' L' + cube.getCoordinates()[3].getX() + ' ' + cube.getCoordinates()[3].getY() + ' L' + cube.getCoordinates()[2].getX() + ' ' + cube.getCoordinates()[2].getY() + ' L' + cube.getCoordinates()[0].getX() + ' ' + cube.getCoordinates()[0].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + opacity + '\' fill=\'' + color + '\' d=\'' + 'M' + cube.getCoordinates()[4].getX() + ' ' + cube.getCoordinates()[4].getY() + ' L' + cube.getCoordinates()[5].getX() + ' ' + cube.getCoordinates()[5].getY() + ' L' + cube.getCoordinates()[7].getX() + ' ' + cube.getCoordinates()[7].getY() + ' L' + cube.getCoordinates()[6].getX() + ' ' + cube.getCoordinates()[6].getY() + ' L' + cube.getCoordinates()[4].getX() + ' ' + cube.getCoordinates()[4].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + opacity + '\' fill=\'' + color + '\' d=\'' + 'M' + cube.getCoordinates()[0].getX() + ' ' + cube.getCoordinates()[0].getY() + ' L' + cube.getCoordinates()[4].getX() + ' ' + cube.getCoordinates()[4].getY() + ' L' + cube.getCoordinates()[6].getX() + ' ' + cube.getCoordinates()[6].getY() + ' L' + cube.getCoordinates()[2].getX() + ' ' + cube.getCoordinates()[2].getY() + ' L' + cube.getCoordinates()[0].getX() + ' ' + cube.getCoordinates()[0].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + opacity + '\' fill=\'' + color + '\' d=\'' + 'M' + cube.getCoordinates()[1].getX() + ' ' + cube.getCoordinates()[1].getY() + ' L' + cube.getCoordinates()[5].getX() + ' ' + cube.getCoordinates()[5].getY() + ' L' + cube.getCoordinates()[7].getX() + ' ' + cube.getCoordinates()[7].getY() + ' L' + cube.getCoordinates()[3].getX() + ' ' + cube.getCoordinates()[3].getY() + ' L' + cube.getCoordinates()[1].getX() + ' ' + cube.getCoordinates()[1].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + opacity + '\' fill=\'' + color + '\' d=\'' + 'M' + cube.getCoordinates()[0].getX() + ' ' + cube.getCoordinates()[0].getY() + ' L' + cube.getCoordinates()[1].getX() + ' ' + cube.getCoordinates()[1].getY() + ' L' + cube.getCoordinates()[5].getX() + ' ' + cube.getCoordinates()[5].getY() + ' L' + cube.getCoordinates()[4].getX() + ' ' + cube.getCoordinates()[4].getY() + ' L' + cube.getCoordinates()[0].getX() + ' ' + cube.getCoordinates()[0].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + opacity + '\' fill=\'' + color + '\' d=\'' + 'M' + cube.getCoordinates()[2].getX() + ' ' + cube.getCoordinates()[2].getY() + ' L' + cube.getCoordinates()[3].getX() + ' ' + cube.getCoordinates()[3].getY() + ' L' + cube.getCoordinates()[7].getX() + ' ' + cube.getCoordinates()[7].getY() + ' L' + cube.getCoordinates()[6].getX() + ' ' + cube.getCoordinates()[6].getY() + ' L' + cube.getCoordinates()[2].getX() + ' ' + cube.getCoordinates()[2].getY() + '\'/>' + '\n';
		if (this.drawSettings.isActivateLayerDimensions()) {
			svg += this.drawText(cube);
		}
		let z = this.calculateAverageZ(cube.getCoordinates());
		let sn = new SortNode(svg, z);
		this.drawOrderList.push(sn);
	}
	drawUnions(modelTree) {
		for (let i = 0; i < modelTree.getNodes().length; i++) {
			for (let j = 0; j < modelTree.getNodes()[i].length; j++) {
				let parent = modelTree.getNodes()[i][j];
				for (let child of parent.getChildren()) {
					let lastCube = child.getLastCube();
					this.lineTo(lastCube, parent.getCubeList()[0]);
				}
			}
		}
	}
	drawCube(cube) {
		let color = this.selectColor(cube);
		let opacity = this.selectOpacity(cube);
		let svg = '';
		svg += '\t\t<path opacity=\'' + opacity + '\' fill=\'' + color + '\' d=\'' + 'M' + cube.getCoordinates()[0].getX() + ' ' + cube.getCoordinates()[0].getY() + ' L' + cube.getCoordinates()[1].getX() + ' ' + cube.getCoordinates()[1].getY() + ' L' + cube.getCoordinates()[3].getX() + ' ' + cube.getCoordinates()[3].getY() + ' L' + cube.getCoordinates()[2].getX() + ' ' + cube.getCoordinates()[2].getY() + ' L' + cube.getCoordinates()[0].getX() + ' ' + cube.getCoordinates()[0].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + opacity + '\' fill=\'' + color + '\' d=\'' + 'M' + cube.getCoordinates()[4].getX() + ' ' + cube.getCoordinates()[4].getY() + ' L' + cube.getCoordinates()[5].getX() + ' ' + cube.getCoordinates()[5].getY() + ' L' + cube.getCoordinates()[7].getX() + ' ' + cube.getCoordinates()[7].getY() + ' L' + cube.getCoordinates()[6].getX() + ' ' + cube.getCoordinates()[6].getY() + ' L' + cube.getCoordinates()[4].getX() + ' ' + cube.getCoordinates()[4].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + opacity + '\' fill=\'' + color + '\' d=\'' + 'M' + cube.getCoordinates()[0].getX() + ' ' + cube.getCoordinates()[0].getY() + ' L' + cube.getCoordinates()[4].getX() + ' ' + cube.getCoordinates()[4].getY() + ' L' + cube.getCoordinates()[6].getX() + ' ' + cube.getCoordinates()[6].getY() + ' L' + cube.getCoordinates()[2].getX() + ' ' + cube.getCoordinates()[2].getY() + ' L' + cube.getCoordinates()[0].getX() + ' ' + cube.getCoordinates()[0].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + opacity + '\' fill=\'' + color + '\' d=\'' + 'M' + cube.getCoordinates()[1].getX() + ' ' + cube.getCoordinates()[1].getY() + ' L' + cube.getCoordinates()[5].getX() + ' ' + cube.getCoordinates()[5].getY() + ' L' + cube.getCoordinates()[7].getX() + ' ' + cube.getCoordinates()[7].getY() + ' L' + cube.getCoordinates()[3].getX() + ' ' + cube.getCoordinates()[3].getY() + ' L' + cube.getCoordinates()[1].getX() + ' ' + cube.getCoordinates()[1].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + opacity + '\' fill=\'' + color + '\' d=\'' + 'M' + cube.getCoordinates()[0].getX() + ' ' + cube.getCoordinates()[0].getY() + ' L' + cube.getCoordinates()[1].getX() + ' ' + cube.getCoordinates()[1].getY() + ' L' + cube.getCoordinates()[5].getX() + ' ' + cube.getCoordinates()[5].getY() + ' L' + cube.getCoordinates()[4].getX() + ' ' + cube.getCoordinates()[4].getY() + ' L' + cube.getCoordinates()[0].getX() + ' ' + cube.getCoordinates()[0].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + opacity + '\' fill=\'' + color + '\' d=\'' + 'M' + cube.getCoordinates()[2].getX() + ' ' + cube.getCoordinates()[2].getY() + ' L' + cube.getCoordinates()[3].getX() + ' ' + cube.getCoordinates()[3].getY() + ' L' + cube.getCoordinates()[7].getX() + ' ' + cube.getCoordinates()[7].getY() + ' L' + cube.getCoordinates()[6].getX() + ' ' + cube.getCoordinates()[6].getY() + ' L' + cube.getCoordinates()[2].getX() + ' ' + cube.getCoordinates()[2].getY() + '\'/>' + '\n';
		if (cube.isKernel) {
			if (this.drawSettings.isActivateKernelDimensions()) {
				svg += this.drawText(cube);
			}
			this.aux = svg + this.aux;
			let sn = new SortNode(this.aux, this.z);
			this.drawOrderList.push(sn);
		} else {
			if (this.drawSettings.isActivateLayerDimensions()) {
				svg += this.drawText(cube);
			}
			this.aux = svg;
			this.z = this.calculateAverageZ(cube.getCoordinates());
		}
	}
	drawText(cube) {
		let svg = '';
		svg += '\t\t<text x=\'' + ((cube.getCoordinates()[4].getX() + cube.getCoordinates()[6].getX()) / 2) + '\' y=\'' + (cube.getCoordinates()[4].getY() + cube.getCoordinates()[6].getY()) / 2 + '\'>' + (cube.getY()) + '</text>\n';
		svg += '\t\t<text x=\'' + ((cube.getCoordinates()[6].getX() + cube.getCoordinates()[7].getX()) / 2) + '\' y=\'' + (cube.getCoordinates()[6].getY() + cube.getCoordinates()[7].getY()) / 2 + '\'>' + (cube.getX()) + '</text>\n';
		svg += '\t\t<text x=\'' + ((cube.getCoordinates()[4].getX() + cube.getCoordinates()[0].getX()) / 2) + '\' y=\'' + (cube.getCoordinates()[0].getY() + cube.getCoordinates()[4].getY()) / 2 + '\'>' + (cube.getY()) + '</text>\n';
		return svg;
		
	}
	drawPyramid(pyramid) {
		let svg = '';
		svg += '\t\t<path opacity=\'' + this.drawSettings.getColor().getConvOpacity() + '\' fill=\'' + this.drawSettings.getColor().getPyramidColor() + '\' d=\'' + 'M' + pyramid.getCoordinates()[0].getX() + ' ' + pyramid.getCoordinates()[0].getY() + ' L' + pyramid.getCoordinates()[1].getX() + ' ' + pyramid.getCoordinates()[1].getY() + ' L' + pyramid.getVertex().getX() + ' ' + pyramid.getVertex().getY() + ' L' + pyramid.getCoordinates()[0].getX() + ' ' + pyramid.getCoordinates()[0].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + this.drawSettings.getColor().getConvOpacity() + '\' fill=\'' + this.drawSettings.getColor().getPyramidColor() + '\' d=\'' + 'M' + pyramid.getCoordinates()[0].getX() + ' ' + pyramid.getCoordinates()[0].getY() + ' L' + pyramid.getCoordinates()[2].getX() + ' ' + pyramid.getCoordinates()[2].getY() + ' L' + pyramid.getVertex().getX() + ' ' + pyramid.getVertex().getY() + ' L' + pyramid.getCoordinates()[0].getX() + ' ' + pyramid.getCoordinates()[0].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + this.drawSettings.getColor().getConvOpacity() + '\' fill=\'' + this.drawSettings.getColor().getPyramidColor() + '\' d=\'' + 'M' + pyramid.getCoordinates()[1].getX() + ' ' + pyramid.getCoordinates()[1].getY() + ' L' + pyramid.getCoordinates()[3].getX() + ' ' + pyramid.getCoordinates()[3].getY() + ' L' + pyramid.getVertex().getX() + ' ' + pyramid.getVertex().getY() + ' L' + pyramid.getCoordinates()[1].getX() + ' ' + pyramid.getCoordinates()[1].getY() + '\'/>' + '\n';
		svg += '\t\t<path opacity=\'' + this.drawSettings.getColor().getConvOpacity() + '\' fill=\'' + this.drawSettings.getColor().getPyramidColor() + '\' d=\'' + 'M' + pyramid.getCoordinates()[2].getX() + ' ' + pyramid.getCoordinates()[2].getY() + ' L' + pyramid.getCoordinates()[3].getX() + ' ' + pyramid.getCoordinates()[3].getY() + ' L' + pyramid.getVertex().getX() + ' ' + pyramid.getVertex().getY() + ' L' + pyramid.getCoordinates()[2].getX() + ' ' + pyramid.getCoordinates()[2].getY() + '\'/>' + '\n\n';
		let z = this.calculateAverageZ(pyramid.getCoordinates());
		let sn = new SortNode(svg, z);
		this.drawOrderList.push(sn);
	}
	drawArrow(arrow) {
		let svg = '';
		svg += '<!-- Arrow -->\n';
		svg += '\t\t<path opacity=\'' + this.drawSettings.getColor().getArrowOpacity() + '\' stroke=\'' + this.drawSettings.getColor().getArrowColor() + '\' d=\'' + 'M' + arrow.getVertex1().getX() + ' ' + arrow.getVertex1().getY() + ' L' + arrow.getVertex2().getX() + ' ' + arrow.getVertex2().getY() + '\'/>' + '\n';
		svg += '\t\t<circle opacity=\'' + this.drawSettings.getColor().getArrowOpacity() + '\' cx=\'' + arrow.getVertex2().getX() + '\' cy=\'' + arrow.getVertex2().getY() + '\' r=\'1\' fill=\'' + this.drawSettings.getColor().getArrowColor() + '\' />\n';
		let z = this.calculateAverageZ(arrow.getCoordinates());
		let sn = new SortNode(svg, z);
		this.drawOrderList.push(sn);
	}
	drawJumps(jumps) {
		for (let jump of jumps) {
			let lastCube = jump[0].getLastCube();
			let firstCube = jump[1].getCubeList()[0];
			this.lineTo(lastCube, firstCube);
		}
	}
	selectColor(cube) {
		if (cube.isKernel) {
			return this.drawSettings.getColor().getKernelColor();
		} 
		else if (cube.isDenseLayer){
			return this.drawSettings.getColor().getDenseColor();
		}
		else if (cube.isInputLayer){
			return this.drawSettings.getColor().getInputColor();
		}
		else {
			return this.drawSettings.getColor().getCubeColor();
		}
	}
	selectOpacity(cube) {
		if (cube.isKernel) {
			return this.drawSettings.getColor().getKernelOpacity();
		} 
		else if (cube.isDenseLayer){
			return this.drawSettings.getColor().getDenseOpacity();
		}
		else if (cube.isInputLayer){
			return this.drawSettings.getColor().getInputOpacity();
		}
		else {
			return this.drawSettings.getColor().getLayerOpacity();
		}
	}
	doTransformations(coordinates) {
		this.matrixController.move('x', coordinates, -this.imageCenter.getX());
		this.matrixController.move('y', coordinates, -this.imageCenter.getY());
		this.matrixController.move('z', coordinates, -this.imageCenter.getZ());
		this.matrixController.rotate(coordinates);
		this.matrixController.move('x', coordinates, this.imageCenter.getX());
		this.matrixController.move('y', coordinates, this.imageCenter.getY());
		this.matrixController.move('z', coordinates, this.imageCenter.getZ());
	}
	calculateCenter(coordinates) {
		let x = (coordinates[0].getX() + coordinates[1].getX() + coordinates[2].getX() + coordinates[3].getX()) / 4;
		let y = (coordinates[0].getY() + coordinates[1].getY() + coordinates[2].getY() + coordinates[3].getY()) / 4;
		let z = (coordinates[0].getZ() + coordinates[1].getZ() + coordinates[2].getZ() + coordinates[3].getZ()) / 4;
		return new Coordinate(x, y, z);
	}
	addHeader() {
		this.svgString = '<svg id="svgImage" width=\'' + (this.x_max - this.x_min + this.drawSettings.getFont().getFont_size()) + 'px\' height=\'' + (this.y_max - this.y_min + this.drawSettings.getFont().getFont_size()) + 'px\' viewBox=\'' + (this.x_min - this.drawSettings.getFont().getFont_size()) + ' ' + (this.y_min - this.drawSettings.getFont().getFont_size()) + ' ' + (this.x_max - this.x_min + this.drawSettings.getFont().getFont_size() + this.drawSettings.getViewBox().getZoom()) + ' ' + (this.y_max - this.y_min + this.drawSettings.getFont().getFont_size() + this.drawSettings.getViewBox().getZoom()) + '\' xmlns=\'http://www.w3.org/2000/svg\'>\n' + '\t<g stroke=\'' + this.drawSettings.getStroke().getStroke_color() + '\' stroke-width=\'' + this.drawSettings.getStroke().getStroke_width() + '\'>\n';
	}
	addFooter() {
		this.svgString += '\t </g>\n' + '</svg>';
	}
	shiftNode(node) {
		let modelQueue = node.getCubeList();
		for (let i = 0; i < modelQueue.length; i++) {
			let cube = modelQueue[i];
			this.matrixController.move('x', cube.getCoordinates(), this.length);
			if (!cube.isKernel && i !== 0) {
				let l = Math.abs(this.depthAux - cube.getCoordinates()[4].getZ());
				this.depth = l + this.drawSettings.getShift().getShiftLayers();
			}
			this.matrixController.move('z', cube.getCoordinates(), this.depth);
			if (!cube.isKernel) {
				this.depthAux = cube.getCoordinates()[0].getZ();
			}
			if (cube.isKernel) {
				let cube_actual = modelQueue[i - 1];
				this.moveKernel(cube_actual, cube);
			}
			this.updateMaxMin(cube.getCoordinates());
		}
	}
	updateMaxMin(coordinates) {
		for (let coordinate of coordinates) {
			if (coordinate.getX() > this.x_max) {
				this.x_max = coordinate.getX();
			}
			if (coordinate.getX() < this.x_min) {
				this.x_min = coordinate.getX();
			}
			if (coordinate.getY() > this.y_max) {
				this.y_max = coordinate.getY();
			}
			if (coordinate.getY() < this.y_min) {
				this.y_min = coordinate.getY();
			}
			if (coordinate.getZ() > this.z_max) {
				this.z_max = coordinate.getZ();
			}
			if (coordinate.getZ() < this.z_min) {
				this.z_min = coordinate.getZ();
			}
		}
	}
	moveKernel(cube_actual, kernel) {
		let difY = Math.abs((cube_actual.getCoordinates()[3].getY() - kernel.getCoordinates()[3].getY()));
		let difX = Math.abs((cube_actual.getCoordinates()[3].getX() - kernel.getCoordinates()[3].getX()));
		let x_random = -difX + (Math.random() * ((difX + difX)));
		let y_random = -difY + (Math.random() * ((difY + difY)));
		this.matrixController.move('x', kernel.getCoordinates(), x_random);
		this.matrixController.move('y', kernel.getCoordinates(), y_random);
	}
	calculateAverageZ(coordinates) {
		let total = coordinates.length;
		let sum = 0;
		for (let coordinate of coordinates) {
			let coord = coordinate.getZ();
			sum += coord;
		}
		return sum / total;
	}
	calculateImageCenter() {
		let center_x = ((this.x_max - this.x_min) / 2) + this.x_min;
		let center_y = ((this.y_max - this.y_min) / 2) + this.y_min;
		let center_z = ((this.z_max - this.z_min) / 2) + this.z_min;
		this.imageCenter = new Coordinate(center_x, center_y, center_z);
		this.x_max = -Number.MAX_VALUE;
		this.y_max = -Number.MAX_VALUE;
		this.x_min = Number.MAX_VALUE;
		this.y_min = Number.MAX_VALUE;
	}
	lineTo(cube1, cube2) {
		cube1.getCoordinates().slice(0, 4)
		let vertex1 = this.calculateCenter(cube1.getCoordinates().slice(0, 4));
		let vertex2 = this.calculateCenter(cube2.getCoordinates().slice(4, 8));
		this.drawArrow(new Arrow(vertex1, vertex2));
	}
}

/*SORTNODE CLASS */
class SortNode {
	constructor(svgString, z) {
		this.svgString = svgString;
		this.z = z;
	}
	getSvgString() {
		return this.svgString;
	}
	getZ() {
		return this.z;
	}
}