import './styles/app.scss';
import Ball from './components/ball.js';
import Paddle from './components/paddle.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants/global';

const KEY_UP = 38;
const KEY_DOWN = 40;

const context = document.querySelector('#app').getContext('2d');

context.fillStyle = '#fff';
context.strokeStyle = '#fff';
context.setLineDash([5, 15]);
context.textAlign = 'center';
context.font = '50px Arial';
const leftPaddle = new Paddle(context, true);
const rightPaddle = new Paddle(context, false);
const ball = new Ball(context, leftPaddle, rightPaddle);

let movDir = undefined;
document.addEventListener('keydown', e => {
  if (e.keyCode === KEY_UP) {
    movDir = 'up';
  } else if (e.keyCode === KEY_DOWN) {
    movDir = 'down';
  }
});
document.addEventListener('keyup', () => movDir = undefined);

if (requestAnimationFrame) {
  function draw() {
    setTimeout(() => {
      requestAnimationFrame(draw);
      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      resetBoard();
      ball.update();
      leftPaddle.update(movDir);
      rightPaddle.update(movDir);
    }, 17);
  }
  requestAnimationFrame(draw);
} else {
  console.error('requestAnimationFrame isn\'t supportted');
}

function resetBoard() {
  context.beginPath();
  context.moveTo(200, 0);
  context.lineTo(200, 400);
  context.stroke();
  // TODO: replace this mock data
  context.fillText('1', 100, 55);
  context.fillText('3', 300, 55);
}
