function Particle(options, grid) {
  this.x = options.x;
  this.y = options.y;
  this.dx = 0;
  this.dy = 0;
  this.age = options.age || Math.ceil(Math.random() * grid.particleMaxAge);
}

(function(){
  this.step = function(grid){
    delete this.reset;

    var particleSpdFactor = grid.particleSpeed,
        spawnArray = grid.spawnArray,
        index;

    this.x += this.dx;
    this.y += this.dy;

    // faster particles are more interesting so they live longer. Reduce age with 100 divided by distance traveled
    this.age -= Math.min( 1 / ( Math.pow(this.dx, 2) + Math.pow(this.dy, 2) ), 1 );// * (this.contaminated ? 1/1000 : 1 );

    if(this.age < 0 || (!this.dx && !this.dy) || !(this.x >= 0 && this.x < grid.width && this.y >= 0 && this.y < grid.width)){ //died of old age or exited bounds
      this.age = Math.ceil(Math.random() * grid.particleMaxAge);

      index = Math.floor(Math.random() * spawnArray.length / 2) * 2;

      this.x = spawnArray[index];// Math.random() * grid.width;
      this.y = spawnArray[index + 1];// Math.random() * grid.height;
      this.reset = true;
      delete this.contaminated;
    }

    var v = grid.getLocalV(this.x, this.y);

    this.dx = v[0] * particleSpdFactor;
    this.dy = v[1] * particleSpdFactor;

    // this.dx += v[0] * particleSpdFactor / 1000;
    // this.dy += v[1] * particleSpdFactor / 1000;
    // this.dx *= 0.99;
    // this.dy *= 0.99;
  };
}).call(Particle.prototype);