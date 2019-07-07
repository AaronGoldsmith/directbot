

function translateDir(obj1, obj2){
  let v1, v2;
  switch(obj1.direction){
   case("down"): v1= createVector(0,-1);break;
   case("up"): v1= createVector(0,1);break;
   case("left"): v1= createVector(-1, 0); break;
   case("right"): v1= createVector(1,0); break;
  }
  switch(obj2.direction){
   case("down"): v2= createVector(0,-1);break;
   case("up"): v2= createVector(0,1);break;
   case("left"): v2= createVector(-1, 0); break;
   case("right"): v2= createVector(1,0); break;
  }
  v1 = v1.mult(obj1.speed/SPEED);
  v2 = v2.mult(obj2.speed/SPEED)
  return v1.add(v2);

}



function mapDirectionsToCells(dirs, cells){
  if(dirs.length == cells.length){
    return cells.map( (cell,i) => {
     cell.updateVel(dirs[i]); 
    })
  }
}
// if every cell should update simultaneously, set interval below
function setVelocities(){
    // after receiving colors, fetch velocities
    NOOPBOT_FETCH({
      API: 'directbot',
      width: appWidth,
      height: appHeight,
      count: 2*COUNT
    }, result => {
      directSet = result.directions;
      cellVelocities = [];
      for(let i = 0;i<directSet.length;i+=2){
        let v = translateDir(directSet[i], directSet[i+1])
        cellVelocities.push(v);
      }
      mapDirectionsToCells(cellVelocities, colorSet)
    })
}
function fetchSet(){
  
   NOOPBOT_FETCH({
    API: 'hexbot',
    width: appWidth-181,
    height: appHeight-141,
    count: COUNT
  }, result => { 
     colorSet = handleColorSet(result)
     setVelocities()
   })
  
}

function handleColorSet(result){
  return result.colors.map(color => {
      const position = color.coordinates;
      const col = parseColor(color.value);
      return new Cell(position, col)
    }) 
}

function resize(){
  appWidth = window.innerWidth;
  appHeight = window.innerHeight;
  appWidth > 900 ?   createCanvas(appWidth-100, appHeight-300) : createCanvas(appWidth, appHeight-300)
}

 function parseColor(c){
     let color = c.substring(1,c.length);
     let r = parseInt(color.substring(0,2), 16)
     let g = parseInt(color.substring(2,4), 16)
     let b = parseInt(color.substring(4,6), 16)
     return [r,g,b]
  }

function windowResized() {
  resize(windowWidth, windowHeight);
}