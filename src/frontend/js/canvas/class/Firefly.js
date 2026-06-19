export class Firefly {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = canvasHeight + 10;
    this.size = Math.random() * 4 + 2;

    this.speedY = Math.random() * 0.3 + 0.1;
    this.angle = Math.random() * 100;

    this.speedAngle = Math.random() * 0.005 + 0.001;
    this.amplitude = Math.random() * 0.2 + 0.01;

    this.alpha = 0.8;
    this.isDead = false;
  }

  update(dt) {
    this.y -= this.speedY * dt;
    this.angle += this.speedAngle * dt;
    this.x = this.x + Math.sin(this.angle) * this.amplitude;
    
    this.alpha -= 0.0001 * dt

    if(this.alpha <= 0 || this.y < -20){
        this.isDead = true
    }
  }

  draw(ctx, parallaxX, parallaxY) {
    const depth = this.size / 4;

    const dislocX = parallaxX * depth;
    const dislocY = parallaxY * depth;

    ctx.beginPath();
    ctx.arc(this.x + dislocX, this.y + dislocY, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(253, 224, 71, ${this.alpha})`;
    ctx.fill();
  }
}