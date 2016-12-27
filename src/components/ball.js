import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants/global';

const DEFAULT_RADIUS = 10;
const DEFAULT_SPEED = { x: 4, y: 5 };

export default class Ball {
  constructor(ctx, leftPadlle, rightPaddle, boardInfoRef) {
    this.ctx = ctx;
    this.leftPadlle = leftPadlle;
    this.rightPaddle = rightPaddle;
    this.boardInfoRef = boardInfoRef;
    this.speed = DEFAULT_SPEED;
    boardInfoRef.on('value', node => {
      const boardInfo = node.val();
      this.x = boardInfo.ballX;
      this.y = boardInfo.ballY;
    });
  }

  draw() {
    const { x, y, ctx } = this;
    if (x === undefined || y === undefined) {
      return;
    }
    ctx.beginPath();
    ctx.arc(x, y, DEFAULT_RADIUS, 0, 2*Math.PI);
    ctx.fill();
  }

  update(isMainPlayer) {
    const { leftPadlle, rightPaddle, x, y, speed } = this;
    if (x === undefined || y === undefined) {
      return;
    }

    const ballPosInfo = { x, y, r: DEFAULT_RADIUS };
    if (leftPadlle.isTouching(ballPosInfo) || rightPaddle.isTouching(ballPosInfo)) {
      this.speed.x = -this.speed.x;
    }

    if (y <= DEFAULT_RADIUS || y >= CANVAS_HEIGHT - DEFAULT_RADIUS) {
      this.speed.y = -this.speed.y;
    }

    let newX = x + speed.x;
    if (newX < -DEFAULT_RADIUS || newX > CANVAS_WIDTH + DEFAULT_RADIUS) {
      newX = 200;
    }

    this.draw();
    isMainPlayer && this.boardInfoRef.update({
      ballX: newX,
      ballY: y + speed.y
    });
  }
}
