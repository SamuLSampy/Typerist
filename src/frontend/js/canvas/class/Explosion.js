export class Explosion {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 1000 + 200;

        this.image = new Image();
        this.image.src = 'assets/img/glow.png';

        this.alpha = 0.01;
        this.increment = 0.003;
        this.isDead = false;

        this.color = this.pickColor();
    }

    pickColor() { 
        const colors = [ 
            [157, 23, 77],
            [124, 58, 237],
            [220, 38, 38]
        ];

        return colors[Math.floor(Math.random() * colors.length)]; 
    }

    update(dt) {
        this.alpha += this.increment * dt;

        if (this.alpha >= 0.8 && this.increment > 0) {
            this.alpha = 0.8;
            this.increment = -0.003;
        }

        if (this.alpha <= 0 && this.increment < 0) {
            this.alpha = 0;
            this.isDead = true;
        }
    }

    draw(ctx) {
        if (!this.image.complete) return;

        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = this.size;
        offscreenCanvas.height = this.size;
        const osCtx = offscreenCanvas.getContext('2d');

        osCtx.drawImage(this.image, 0, 0, this.size, this.size);

        osCtx.globalCompositeOperation = 'source-in';

        osCtx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
        osCtx.fillRect(0, 0, this.size, this.size);

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(offscreenCanvas, this.x - this.size / 2, this.y - this.size / 2);
        ctx.globalAlpha = 1.0;
    }
}