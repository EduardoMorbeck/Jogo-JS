const perso = document.querySelector(".personagem")
const pipe = document.querySelector(".pipe")

const jump = () => {
    perso.classList.add('jump')

    setTimeout( () => {
        perso.classList.remove('jump')
    }, 500)
}

const loop = setInterval( () => {
    const pipePosition = pipe.offsetLeft
    const personPosition = +window.getComputedStyle(perso).bottom.replace('px','')
    if(pipePosition <= 120 && pipePosition > 0 && personPosition < 80){
        pipe.style.animation = "none"
        pipe.style.left = `${pipePosition}px`
        perso.style.animation = "none"
        perso.style.bottom = `${personPosition}px`

        perso.src = './imagens/game-over.png'
        perso.style.width = '75px'
        perso.style.marginLeft = '50px'

        clearInterval(loop)
    }

}, 100)

document.addEventListener('keydown', jump)