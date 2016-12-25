import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants/global';

const DEFAULT_RADIUS = 10;
const DEFAULT_SPEED = { x: 4, y: 5 };

export default class Ball {
  constructor(ctx, leftPadlle, rightPaddle) {
    this.ctx = ctx;
    this.reset();
    this.leftPadlle = leftPadlle;
    this.rightPaddle = rightPaddle;
  }

  reset() {
    this.speed = DEFAULT_SPEED;
    this.x = Math.random() * 200 + 100;
    this.y = Math.random() * 200 + 100;
    this.draw(DEFAULT_RADIUS);
  }

  draw() {
    const { x, y, ctx } = this;
    ctx.beginPath();
    ctx.arc(x, y, DEFAULT_RADIUS, 0, 2*Math.PI);
    ctx.fill();
  }

  update() {
    const { leftPadlle, rightPaddle, x, y, speed } = this;

    if (x <= 0 || x >= CANVAS_WIDTH) {
      this.reset();
    }

    const ballPosInfo = { x, y, r: DEFAULT_RADIUS };
    if (leftPadlle.isTouching(ballPosInfo) || rightPaddle.isTouching(ballPosInfo)) {
      this.speed.x = -this.speed.x;
    }

    if (y <= DEFAULT_RADIUS || y >= CANVAS_HEIGHT - DEFAULT_RADIUS) {
      this.speed.y = -this.speed.y;
    }

    this.x += speed.x;
    this.y += speed.y;

    this.draw();
  }
}
