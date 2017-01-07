import './styles/app.scss';
import Ball from './components/ball.js';
import Paddle from './components/paddle.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants/global';
import { getDefaultDatabase } from './helpers/firebase';
import gameController from './helpers/gameController';

const leftPaddleRef = getDefaultDatabase().ref('leftPaddle');
const rightPaddleRef = getDefaultDatabase().ref('rightPaddle');
const dbUserCountRef = getDefaultDatabase().ref('userCount');
const boardInfoRef = getDefaultDatabase().ref('boardInfo');

const KEY_UP = 38;
const KEY_DOWN = 40;

const context = document.querySelector('#app').getContext('2d');

const leftPaddle = new Paddle(context, true, leftPaddleRef);
const rightPaddle = new Paddle(context, false, rightPaddleRef);
const ball = new Ball(context, leftPaddle, rightPaddle, boardInfoRef);

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
      requestAnimationFrame(draw);
      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      resetBoard();
      ball.update(gameController.isUser1);
      leftPaddle.update(gameController.isUser1 ? movDir : undefined);
      rightPaddle.update(gameController.isUser2 ? movDir : undefined);
  }
  requestAnimationFrame(draw);
} else {
  console.error('requestAnimationFrame isn\'t supportted');
}

function resetBoard() {
  context.fillStyle = '#fff';
  context.strokeStyle = '#fff';
  context.setLineDash([5, 15]);
  context.textAlign = 'center';
  context.font = '50px Arial';

  context.beginPath();
  context.moveTo(200, 0);
  context.lineTo(200, 400);
  context.stroke();
  // TODO: replace this mock data
  context.fillText('😂', 100, 55);
  context.fillText('😂', 300, 55);
}
