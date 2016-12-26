import './styles/app.scss';
import Ball from './components/ball.js';
import Paddle from './components/paddle.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants/global';
import { getDefaultDatabase } from './helpers/firebase';

const leftPaddleRef = getDefaultDatabase().ref('leftPaddle');
const rightPaddleRef = getDefaultDatabase().ref('rightPaddle');
const dbUserCountRef = getDefaultDatabase().ref('userCount');
let isUser1, isUser2;

dbUserCountRef.transaction(function(d) {
   return d !== undefined ? d + 1 : 0;
}, function(d) {
  dbUserCountRef.once('value').then(d => {
    isUser1 = d.val() === 1;
    isUser2 = d.val() === 2;
  })
});

window.onunload = () => {
  dbUserCountRef.set(0)
}

const KEY_UP = 38;
const KEY_DOWN = 40;

const context = document.querySelector('#app').getContext('2d');

context.fillStyle = '#fff';
context.strokeStyle = '#fff';
context.setLineDash([5, 15]);
context.textAlign = 'center';
context.font = '50px Arial';
const leftPaddle = new Paddle(context, true, leftPaddleRef);
const rightPaddle = new Paddle(context, false, rightPaddleRef);
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
      leftPaddle.update(isUser1 ? movDir : undefined);
      rightPaddle.update(isUser2 ? movDir : undefined);
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
  context.fillText('😂', 100, 55);
  context.fillText('😂', 300, 55);
}
