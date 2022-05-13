//----(References)---
/*https://docs.google.com/forms/d/e/1FAIpQLSc681SqwIRr3YbJVeKsfn5KaGPxC9VDs9EJDWfK0UBWkKWbRQ/viewform
https://developer.mozilla.org/es/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL
https://happycoding.io/tutorials/p5js/array-functions
https://steemit.com/utopian-io/@aossoftware/create-moving-stars-simulation-with-p5-js
https://www.rapidtables.com/web/color/RGB_Color.html#color-table
https://fineartamerica.com/featured/5-atom-artwork-mehau-kulyk.html
https://www.youtube.com/watch?v=k2FguXvqp60
https://p5js.org/reference/
*/

//GLOBAL VARIABLES
//-------(colors)-------
let pink = "#FF00FF";
let violet = "#8A2BE2";
let cyan = "#00FFFF";
let lime = "#00FF00";
let Yellow = "#FFFF00";
let orange = "#FF4500";
let Red = "#FF0000";
let lightBlue = "#87CEFA";
let indigo = "#8A2BE2";
let black = "#000000";
//-----------------------
let angle = 0;
let angle1 = 0;
let angleVel = 1;
let size;
let x, y, x1, y1;
let colorArray = []; //initialize color array
let i = 0;
let j = 0;
let a = 0;
let d = 0;
let k = 0;
/*let dist1x = 400;
let dist2x = 0;
let dist1y = 400;
let dist2y = 0;*/
let xDir;
let yDir;
let atoms = [];
let dots = [];
let numAtoms = 100;
let Oswald;//initialize variable for type of font

function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);//WEBGL is for 3D shapes

  for (a = 0; a < numAtoms; a++) {
    atoms[a] = new Atom();
  }

    for (let d = 0; d < 1000; d++) {
    dots[d] = new Dot();
  }

  x = 100;
  y = 110;

  colorArray = [Red, pink, violet, cyan, lime, Yellow, orange]; //color array
}

function draw() {

  background(0);

    for (let d = 0; d < 1000; d++) {
       dots[d].move();
       dots[d].display();
  }

//----(in charge of making the circles in the background)------
  for (let n = 0; n < 28; n++) {
  for (let s = 0; s < 28; s++) {
    push();
    noStroke();
    fill("white");
    translate(-540,-540,-300);
    angle1+= 0.3;
    size = map(sin(angle1*3.5), -1, 1, 0, 1.5);
    circle(n*40, s*40, size);
    pop();
  }
}
//-------------------------------------------------------------

  angle += angleVel;

  if (key === "c") {
    colorMode(HSB, 500, 500, 90, 90, 90);
  }
  if (key == "n") {
    colorMode(RGB, 0, 0, 0, 0, 0);
  }
  if (key === "d") {
    angle += 5;
  }

  // -------------- Trial by fire (Atoms repelling) --------------

  // 1. Este "for" principal es para pasar por cada uno de las variables del array "atoms". NOTA: atoms.length = 10, pero dado que el array en JavaScript comienza en 0, el hecho de tener 0 - 9 variables resulta en la dimensión 10.
  for (j = 0; j < atoms.length; j++) {
    x = atoms[j].x; // Guardar la coordenada X de cada variable en atoms en la var X.
    y = atoms[j].y; // Guardar la coordenada Y de cada variable en atoms en la var Y.
    //console.log("x: " + x);
    //console.log("y: " + y);
    d = dist(0, 0, x, y); // Encuentra la distancia entre el origen y la molécula actual.

    if (d < 320) {          // Verifica si esta distancia es menor a 320 (radio de un
                            //círculo que cubre toda el átomo principal del centro).
      xDir = random(4, 8); // Incrementos aleatorios para "mover" la molécula
                            //en dir X.
      yDir = random(4, 8); // Incrementos aleatorios para "mover" la molécula
                            //en dir Y.
    if (x < 0 && y < 0) {   // Esta condicional verifica si la coordenada X y Y
                            // AMBOS!!!! cumplan. Con esto el programa nos dice
                            //que la molecula se encuentra en el cuadrante 2 de
                            //un plano cartesiano. Con esto, sabemos que la
                            //direccion de repele de la molecula es hacia la
                            //direccion diagonal izquierda superior.
        atoms[j].x -= xDir; // Esto empuja la molecula hacia la izquierda.
        atoms[j].y -= yDir; // Esto empuja la molecula hacia arriba.
      }
      else if (x > 0 && y > 0) {// Esto es para repeler hacia el cuadrante 4 del
        atoms[j].x += xDir;     //plano cartesiano.
        atoms[j].y += yDir;
      }
      else if (x < 0 && y > 0) {// Esto es para repeler hacia el cuadrante 3.
        atoms[j].x -= xDir;
        atoms[j].y += yDir;
      }
      else if (x > 0 && y < 0) {// Esto es para repeler hacia el cuadrante 1.
        atoms[j].x += xDir;
        atoms[j].y -= yDir;
      }
    }
  }

  //----------(Translated version of the comments above)-----------
  /* 1. This main "for" is for it to pass through all the variable in the array "atoms". NOTE: atoms.length = 10, but because JavaScript starts at 0, the fact that you have 0-9 variables, results in a dimension of 10.

  x = atoms[j].x; This saves the x coordinate for each variable in atoms and stores it in var X while y = atoms[j].y; does the same, but just for the Y coordinates of each variable in the "atoms" array.

  d = dist(0, 0, x, y); This finds the distance between the origin atom and the mini molecules.

  The first "if" statement is a condicional that verifies if the distance is less than 320 (which is the radius of the circle area composed of the main atom). The xDir = random(4,8) indicates random increments in the x coordinate direction while the yDir = random (4,8) is for the y coordinate direction.

  The second "if" is the condicional that verifies if BOTH!!!! the X & Y are complying. If they do, and the mini atom is on the second quadrant of a cartesian plane, then it repels diagonally to the upper left area.

  The first "else-if" condicional states that if the atom's X & Y coordinates are bigger than 0, then it will repel towards the fourth quadrant. The next condicional states that if the atom's X coordinate is smaller than 0, and its Y coordinate is bigger than 0, then it will repel towards quadrant 3. The last condicional states that if the atom's X coordinate is bigger than 0, and the Y coordinate is smaller than 0, then the atom will repel towards quadrant 1.
  */
  // --------------------------------------------

  //---------- (creates the light and material of objects) ------------
  ambientLight(60, 60, 60); //creates the ambients light color
  pointLight(255, 255, 255, width / 2, height/2, 75); //light in bottom-right corner
  specularMaterial(255); //makes the object's material
  shininess(10); //how shiny you want it to look
  noStroke(); //takes away the lines that make the 3D shape
  //--------------------------------------------------------


  //----(in charge of creating multiple mini atoms in background)-----
  for (a = 0; a < atoms.length; a++) {
    atoms[a].update();
    atoms[a].display();
  }

  //creates more atoms
  if (key === "m") {
    createMore();
  }

  //deletes atoms
  if (key === "r") {
    atoms.splice(100, 4);
  }

  //------------------------------------------------------------------

  //--------(Instructions)--------
  textFont(Oswald);
  textSize(15);
  fill("white");

  push();
  translate(-384, -370, 10);
  text('Key "p" = mini atoms move sporadically', 0, 0);
  pop();

  push();
  translate(-384, -354, 10);
  text('Key "d" = speeds up rotation of main atom', 0, 0);
  pop();

  push();
  translate(-384, -338, 10);
  text('Key "s" = stops all added movements', 0, 0);
  pop();

  push();
  translate(-384, -320, 10);
  text('Key "c" = change color of entire image', 0, 0);
  pop();

  push();
  translate(-384, -302, 10);
  text('Key "n" = go back to normal color', 0, 0);
  pop();

  push();
  translate(-384, -284, 10);
  text('Key "m" = create more mini atoms', 0, 0);
  pop();

  push();
  translate(-384, -266, 10);
  text('Key "r" = removes mini atoms leaving just 100', 0, 0);
  pop();

  push();
  translate(-384, -248, 10);
  text('Mouse is pressed = change color of electrons', 0, 0);
  pop();
  //-------------------------------

  //---------- (molecule purple balls) ------------
  push();
  rotateY(radians(angle));
  translate(-20, -70);
  moleculeBalls(20, -170, 70, 50, -230, 35, 103);
  pop();

  push();
  scale(0.85);
  rotateY(radians(angle));
  translate(-30, 65);
  moleculeBalls(20, -170, 70, 50, -230, 35, 103);
  pop();

  push();
  scale(0.75);
  rotateY(radians(angle));
  translate(40, 180);
  moleculeBalls(20, -170, 70, 50, -230, 35, 103);
  pop();

  push();
  scale(0.65);
  rotateY(radians(angle));
  translate(160, 280);
  moleculeBalls(20, -170, 70, 50, -230, 35, 103);
  pop();

  push();
  scale(0.58);
  rotateY(radians(angle));
  translate(320, 340);
  moleculeBalls(20, -170, 70, 50, -230, 35, 103);
  pop();

  push();
  scale(0.5);
  rotateY(radians(angle));
  translate(510, 360);
  moleculeBalls(20, -170, 70, 50, -230, 35, 103);
  pop();
  //----------------------------------------------------

  //-------(particles are the light blue balls)--------
  push();
  rotate(radians(angle));
  rotateX(radians(angle));
  particles(-170, -50, 5, lightBlue);
  particles(-180, -65, 7, lightBlue);
  particles(-187, -85, 10, lightBlue);
  particles(-187, -120, 13, lightBlue);
  particles(-165, -160, 15, lightBlue);
  particles(-120, -200, 17, lightBlue);
  particles(-50, -230, 19, lightBlue);
  particles(35, -230, 21, lightBlue);
  particles(120, -195, 25, lightBlue);
  pop();
  //----------------------------------------------

  //---(electrons rotating around the rings)----
  push();
  rotateX(radians(angle));
  rotateY(radians(angle));
  rotateZ(radians(angle));
  particles(-72, -130, 15, colorArray[i]);
  particles(-80, 128, 15, colorArray[i]);
  particles(137, -60, 15, colorArray[i]);
  pop();

  push();
  rotate(-PI / 3);
  rotateX(radians(angle));
  rotateY(radians(angle));
  rotateZ(radians(angle));
  particles(-140, 50, 15, colorArray[i]);
  particles(110, 100, 15, colorArray[i]);
  particles(60, -135, 15, colorArray[i]);
  pop();

  push();
  rotate(PI / 3);
  rotateX(radians(angle));
  rotateY(radians(angle));
  rotateZ(radians(angle));
  particles(-140, -50, 15, colorArray[i]);
  particles(27, 148, 15, colorArray[i]);
  particles(148, 20, 15, colorArray[i]);
  pop();

  if (mouseIsPressed == true) {
    particles(0, 0, 0, colorArray[i]);
    i += 1;
    if (i > 6) {
      i = 0;
    }
  }
  //--------------------------------------------

  //-------(the white rings that are rotating)--------
  push();
  rings(PI / 3);
  pop();

  push();
  rings(0);
  pop();

  push();
  rings(-PI / 3);
  pop();
  //-------------------------------------------------

  //-------(creates the row of nuclei that are rotating)--------
  push();
  scale(0.3);
  rotateZ(radians(angle));
  translate(20, -130);
  nucleus();
  pop();

  push();
  scale(0.35);
  rotateZ(radians(angle));
  translate(70, -190);
  nucleus();
  pop();

  push();
  scale(0.4);
  rotateZ(radians(angle));
  translate(120, -230);
  nucleus();
  pop();

  push();
  scale(0.45);
  rotateZ(radians(angle));
  translate(180, -260);
  nucleus();
  pop();

  push();
  scale(0.5);
  rotateZ(radians(angle));
  translate(260, -240);
  nucleus();
  pop();

  push();
  scale(0.55);
  rotateZ(radians(angle));
  translate(320, -200);
  nucleus();
  pop();

  push();
  scale(0.6);
  rotateZ(radians(angle));
  translate(360, -120);
  nucleus();
  pop();

  push();
  scale(0.65);
  rotateZ(radians(angle));
  translate(360, -40);
  nucleus();
  pop();

  push();
  scale(0.7);
  rotateZ(radians(angle));
  translate(340, 40);
  nucleus();
  pop();

  push();
  scale(0.75);
  rotateZ(radians(angle));
  translate(310, 120);
  nucleus();
  pop();

  push();
  scale(0.8);
  rotateZ(radians(angle));
  translate(240, 200);
  nucleus();
  pop();
  //-------------------------------------------------------

  //-------(the nucleus at the center)--------
  nucleus();
  //------------------------------------------

}

//-------(function creating the nucleus)--------
function nucleus() {
  fill("green");
  rotateX(radians(angle));
  rotateY(radians(angle));
  sphere(15);

  push();
  fill("blue");
  translate(10, 10);
  rotateY(radians(angle));
  sphere(15);
  pop();

  push();
  fill("blue");
  translate(0, 10, 20);
  rotateY(radians(angle));
  sphere(15);
  pop();

  push();
  fill("green");
  translate(10, 0, 10);
  rotateY(radians(angle));
  sphere(15);
  pop();

  push();
  fill("blue");
  translate(-10, 0, 10);
  rotateY(radians(angle));
  sphere(15);
  pop();

  push();
  fill("green");
  translate(-10, 10, 0);
  rotateY(radians(angle));
  sphere(15);
  pop();
}
//---------------------------------------------------

//-------(function creating the rings)--------
function rings(ang) {
  push();
  rotate(ang);
  rotateX(radians(angle));
  rotateY(radians(angle));
  rotateZ(radians(angle));
  torus(150, 5, 100);
  pop();
}
//---------------------------------------------

//-------(function creating the particles/the light blue balls)--------
function particles(x, y, size, colorFill) {
  push();
  translate(x, y);
  fill(colorFill);
  sphere(size);
  pop();
}

//-------(function creating the molecule balls/the purple ones)--------
function moleculeBalls(bSize, xPos, yPos, zPos, xPos2, yPos2, yPos3) {
  push();
  fill(indigo);
  translate(xPos, yPos, zPos);
  sphere(bSize);
  pop();

  push();
  fill(indigo);
  translate(xPos2, yPos2, zPos);
  sphere(bSize);
  pop();

  push();
  fill(indigo);
  translate(xPos2, yPos3, zPos);
  sphere(bSize);
  pop();

  push();
  translate(-230, 70, 50);
  rotate(-PI / 60);
  fill("white");
  cylinder(5, 45);
  pop();

  push();
  translate(-195, 87, 50);
  rotate(QUARTER_PI - 50);
  fill("white");
  cylinder(5, 45);
  pop();

  push();
  translate(-205, 53, 50);
  rotate(-PI / 3);
  fill("white");
  cylinder(5, 45);
  pop();
}
//------------------------------------------------------------

function createMore() {
  let newAt = new Atom();
  atoms.push(newAt);
}

//------(Class function making this not a global function)-------

//----(in charge of setting the values)------
class Atom {
  constructor(x, y) {
    this.x = random(-400, 400);
    this.y = random(-400, 400);
    this.rColor = "red";
    this.bColor = "blue";
  }
  //-------------------------------------------

  //----(in charge of motion/makes the jitter)----
  update() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);

    //---(makes the mini atoms move randomly)---
    if (key === "p") {
      this.x = random(-400, 400);
      this.y = random(-400, 400);
    }

    //stop all movement that was added with other keys
    if (key === "s") {
      this.x = this.x + random(-2, 2);
      this.y = this.y + random(-2, 2);
    }
  }
  //--------------------------------------------

  //----------------------------------------------
  //---(in charge of mini atoms displayed in canvas)---
  display() {
    push();
    translate(this.x, this.y);
    fill(this.rColor);
    sphere(5);
    pop();

    push();
    translate(this.x - 5, this.y - 5);
    fill(this.bColor);
    sphere(5);
    pop();
  }
  //------------------------------------------------
}

class Dot {
  constructor() {
    this.xPlane = random(-400,400);
    this.yPlane = random(-400,400);
    this.zPlane = random(-400,400);
    this.angle = 0;
  }

  move() {
    this.zPlane = this.zPlane-1;

    if (this.zPlane < 1) {
      this.zPlane = 800;
    }

    this.xPos = map(this.xPlane/this.yPlane/this.zPlane,0,1,0,800);
    this.yPos = map(this.zPlane/this.yPlane,0,1,0,800);

    this.angle += 0.05;
    this.size = map(sin(this.angle), -1, 1, -2, 4);
  }

  display() {
    fill("white");
    ellipse(this.xPos,this.yPos,this.size,this.size);
  }
}

//------(function to load font/gets it ready before setup)-------
function preload() {
  Oswald = loadFont("Oswald.ttf");//load this type of font
}
