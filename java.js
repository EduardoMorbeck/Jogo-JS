const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
let score = 0
let best = 0
let isGameStart = false
const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace('px', ' ')

const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

let audioStart = document.getElementById('audioTheme')
let audioGameOver = document.getElementById('audioGameOver')


const startGame = () => {
  isGameStart = true
  pipe.classList.add('pipe-animation')
  start.style.display = 'none'

  audioStart.play()
}

const restartGame = () => {
  isGameStart = true
  gameOver.style.display = 'none'
  pipe.style.left = ''
  pipe.style.right = '0'
  mario.src = './img/mario.gif'
  mario.style.width = '150px'
  mario.style.bottom = '0'
  score = 0

  start.style.display = 'none'

  audioGameOver.pause()
  audioGameOver.currentTime = 0;

  audioStart.play()
  audioStart.currentTime = 0;

}

const jump = () => {
  if (marioPosition <= 0) {
    mario.classList.add('jump')
    score ++

    setTimeout(() => {
      mario.classList.remove('jump')
    }, 800)
  }
}

const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace('px', ' ')

    if (pipePosition <= 120 && pipePosition > 70 && marioPosition < 70) {
      isGameStart = false
      pipe.classList.remove('.pipe-animation')
      pipe.style.left = `${pipePosition}px`

      mario.classList.remove('.jump')
      mario.style.bottom = `${marioPosition}px`

      mario.src = './img/game-over.png'
      mario.style.width = '80px'
      mario.style.marginLeft = '50px'
      
      
      function stopAudioStart() {
        audioStart.pause()
      }
      stopAudioStart()
      
      audioGameOver.play()
      
      gameOver.style.display = 'flex'
      document.getElementById('score').textContent = score;
      document.getElementById('best').textContent = best;
      score >= best ? best = score:
      
      clearInterval(loop)
    }
  }, 10)
}

loop()

document.addEventListener('keydown', e => {
  const tecla = e.key
  if (tecla === ' '  && isGameStart ) {
    jump()
  }
})

document.addEventListener('touchstart', e => {
  if (e.touches.length  && isGameStart ) {
    jump() 
  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter' && isGameStart ) {
    startGame()
  } else if (tecla === 'Enter' && !isGameStart ){
    restartGame()
  }
})