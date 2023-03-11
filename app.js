//pega a referencia do 'form' com as perguntas
const form = document.querySelector('.quiz-form')
//array contendo as respostas certas das perguntas da tela do Quiz
const correctAnswers = ['C', 'A', 'C', 'B', 'A']
//pega a referenv=cia da div 'result' para mostrar o resultado
const finalScoreContainer = document.querySelector('.final-score-container')
// const trouxaBrucho
//score
let score = 0
const percentual = 100 / correctAnswers.length

const getUserAswers = () => {
    let userAnswers = []

    correctAnswers.forEach((_, index) => {
        const userAnswer = form[`inputQuestion${index + 1}`].value
        userAnswers.push(userAnswer)
    })

  return userAnswers
}

const calculateUserScore = userAnswers => {
  userAnswers.forEach((userAnswer, index) => {
    //caso resposta certa adiciona a pontuação
    const isUserAnswerCorrect = userAnswer === correctAnswers[index]
    if (isUserAnswerCorrect) {
      score +=  percentual
    }
    score += 1
  })
}

//sobe a página para o topo da aplicação
//mostra o resultado em uma 'div' abaixo do nome da aplicação
const showFinalScore = () => {
  scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth' 
  })
  finalScoreContainer.classList.remove('d-none')
}

//anima a pontuação do resultado final
const animateFinalScore = () => {
  let counter = 0
  const timer = setInterval(() => {
    if (counter === score) {
      clearInterval(timer)
    }
    finalScoreContainer.querySelector('span').textContent = `${counter++}%`
  }, 20)
}

//trata as respostas do usuário
const onsubmitAnswers = event => {
  event.preventDefault() //evita que o form seja enviado

  //armazena as resposta do usuário no array 'userAnswers'
  const userAnswers = getUserAswers()

  //verifica as resposta do usuário e adiciona a pontuação
  calculateUserScore(userAnswers)
  showFinalScore()
  animateFinalScore()
}

//adiciona um ouvinte ao form
form.addEventListener('submit', onsubmitAnswers)
