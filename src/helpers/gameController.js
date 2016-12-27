import { getDefaultDatabase } from './firebase';
const userID = Math.random() * 10000 + '' ;

const leftPaddleBtn = document.querySelector('#leftPaddle');
const rightPaddleBtn = document.querySelector('#rightPaddle');

class gameController {
  constructor() {
    this.boardInfoRef = getDefaultDatabase().ref('boardInfo');
    const userInfoRef = getDefaultDatabase().ref('userInfo');
    this.isUser1 = this.isUser2 = false;

    userInfoRef.on('value', node => {
      const userInfo = node.val();
      if (userInfo) {
        leftPaddleBtn.style.display = userInfo.user1ID === -1 ? 'inline-block' : 'none';
        rightPaddleBtn.style.display = userInfo.user2ID === -1 ? 'inline-block' : 'none';
      }
    });

    leftPaddleBtn.addEventListener('click', () => {
      leftPaddleBtn.style.display = 'none';
      rightPaddleBtn.style.display = 'none';
      userInfoRef.transaction((d) => {
        if (d && d.user1ID === -1) {
          d.user1ID = userID;
          this.isUser1 = true;
        }
        return d
      });
    });

    rightPaddleBtn.addEventListener('click', () => {
      leftPaddleBtn.style.display = 'none';
      rightPaddleBtn.style.display = 'none';
      userInfoRef.transaction((d) => {
        if (d && d.user2ID === -1) {
          d.user2ID = userID;
          this.isUser2 = true;
        }
        return d
      });
    });

    window.onunload = () => {
      if (this.isUser1) {
        userInfoRef.update({ user1ID: -1 })
      }
      if (this.isUser2) {
        userInfoRef.update({ user2ID: -1 })
      }
    }
  }
}

export default new gameController();
