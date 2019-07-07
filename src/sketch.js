let appWidth, appHeight;

const COUNT = 400;
const SPEED = 50;
let slider, button;
let cellVelocities;
let directSet;
let colorSet;
let tick;

function setupStyles()
{
  slider.class("slide");
  slider2.class('slide2')
  slider3.class('slide3')

  button.class("btn")
  button.mousePressed(handleClear)

}

// SETUP
function setup()
{
  resize();
  fetchSet();
  tick = 0;
  
  let controlBox = createDiv();
  controlBox.position(0, windowHeight - 180);
  controlBox.style("width", "100%")
  controlBox.style("text-align", "center")
  let sliderBox = createDiv();
  let sliderBox2 = createDiv();
  let sliderBox3 = createDiv();


  sliderBox.class('sliderWrap');
  sliderBox2.class('sliderWrap');
  sliderBox3.class('sliderWrap');

  slider = createSlider(5, 105, 15, 1);
  slider2 = createSlider(0, 9, 1, 0.01);
  slider3 = createSlider(0, 255, 0, 1);
  sliderBox.child(createElement("label", "size"))
  sliderBox2.child(createElement("label", "speed"))
  sliderBox3.child(createElement("label", "trail"))

  sliderBox.child(slider);

  sliderBox2.child(slider2);

  sliderBox3.child(slider3);

  button = createDiv("clear")

  controlBox.child(sliderBox);
  controlBox.child(sliderBox2);
  controlBox.child(sliderBox3);
  controlBox.child(button);
  setupStyles();
}

function start_app() { resize() }

function handleClear() {clear(); background(255) }

function draw()
{
  let bg = color(255)
  bg.setAlpha(slider3.value())
    background(bg)
  
  if (colorSet) colorSet.map((color) => color.live())


}