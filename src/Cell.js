p5.Vector.prototype.onGrid = function(){
   return (this.x > slider.value()/2 && this.y > slider.value()/2 && this.x < width-slider.value()/2  && this.y < height-slider.value()/2 );
}

function Cell(pos, color, lifespan){
   this.color = color
   this.stationary = false;
   this.lifespan = lifespan;
   this.velocity = createVector(0,0);

   // account for canvas margin
   this.position = createVector(pos.x+30, pos.y+30);    
}
Cell.prototype.live = function(){
  this.show();
  this.move(slider2.value());
}
Cell.prototype.show = function(){
  noStroke();
  fill(this.color);
  circle(this.position.x, this.position.y, slider.value());
}
Cell.prototype.move = function(vel){

    const velocity = this.velocity.copy().mult(vel);
    let nextPos = this.position.copy().add(velocity)
    if(nextPos.onGrid()){
        this.position.add(velocity);
    }
    else{
      this.velocity.rotate(random(60,100))
    }
    // each bounce decrease lifespan by 2
}
Cell.prototype.updateVel = function(velX, velY){
  this.velocity = createVector(velX,velY)
}
Cell.prototype.updateVel = function(velocityVec){
  this.velocity = velocityVec
}

