import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants/global';

const DEFAULT_HEIGHT = 60;
const DEFAULT_WIDTH = 10;
const DEFAULT_SPEED = 8;

export default class Paddle {
  constructor(ctx, isLeft, dbRef) {
    this.ctx = ctx;
    this.isLeft = isLeft;
    this.draw();
    this.dbRef = dbRef;
    this.x = isLeft ? DEFAULT_WIDTH : CANVAS_WIDTH - 2 * DEFAULT_WIDTH;
    dbRef.on('value', d => this.y = d.val())
  }

  draw() {
    const { isLeft, ctx, x, y } = this;
    ctx.fillRect(x, y, DEFAULT_WIDTH, DEFAULT_HEIGHT);
  }

  isTouching(ballPos) {
    const { isLeft, x, y } = this;

    const isSameVertical = (ballPos.y + ballPos.r >= y) &&
      (ballPos.y - ballPos.r < y + DEFAULT_HEIGHT);

    if (isSameVertical) {
      if (isLeft) {
        return (ballPos.x - ballPos.r) <= (x + DEFAULT_WIDTH) &&
          (ballPos.x - ballPos.r) > x;
      }
      return (ballPos.x + ballPos.r) >= x &&
        (ballPos.x + ballPos.r) < (x + DEFAULT_WIDTH);
    }

    return false;
  }

  update(movDir, pos) {
    let { y } = this;
    if (y === undefined) {
      return;
    }

    if (movDir) {
      if (movDir === 'up') {
        y -= DEFAULT_SPEED
      } else {
        y += DEFAULT_SPEED
      }
      if (y < 0) {
        y = 0;
      } else if (y + DEFAULT_HEIGHT > CANVAS_HEIGHT) {
        y = CANVAS_HEIGHT - DEFAULT_HEIGHT;
      }
    }

    this.dbRef.set(y);
    this.draw();
  }
}
