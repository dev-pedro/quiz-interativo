const form = document.querySelector('.quiz-form')
const finalScoreContainer = document.querySelector('.final-score-container')
const bruxoOuTrouxa = document.querySelector('.bruxo-trouxa')
const divQuestion = document.querySelector('.questions')
let correctAnswers = []
let scoreScript = 0
let percentual = Math.round(100 / correctAnswers.length)
let wasAnswered = false
let templateHTML = ''

/**Cria as perguntas com as opções dentro do form
 * esta função retorna um template HTML contendo
 * RECEBE COMO ARGUMENTO UM ARRAY DE OBJETOS
 * uma div com
 *  - titulo da pergunta
 *  - opções de resposta
 * os estilos CSS são "bootstrap@4.4.1"
 */
function insertAsketsOnIndexHTML (questions = {}) {
  let asksLabel = ''
  questions.forEach(({ number, title, options, correctAnswer }) => {
    //adiciona em um arrays as respostas corretas
    correctAnswers.push(correctAnswer)

    //cria as input label com as opções de respostas
    options.forEach((option, index) => {
      asksLabel += `<div class="form-check my-2 text-black-50">
                        <label class="form-check-label">
                        <input class="pergunta" type="radio" name="inputQuestion${number}" value="${index}" />
                        ${option}
                        </label>
                        </div>`
    })
    //cria a pergunta com as opções de respostas
    templateHTML += `<div class="my-5">
                <p class="lead font-weight-normal">
                ${number}. ${title}
                </p>
                ${asksLabel}
                </div>
            </div>`
    asksLabel = '' //limpa asksLabel para evitar duplicação
  })

  divQuestion.innerHTML = templateHTML
  form.insertAdjacentElement('afterbegin', divQuestion)
  //return templateHTML
}
//carrega um JSON e chama function para popular o index
const allQuestions = []
fetch('./questions.json')
  .then(response => response.json())
  .then(data => {
    insertAsketsOnIndexHTML(data.questions)
    percentual = Math.round(100 / data.questions.length)
  })

//armazena as resposta do usuário no array 'userAnswers'
const getUserAswers = () => {
  let userAnswers = []
  correctAnswers.forEach((_, index) => {
    const userAnswer = form[`inputQuestion${index + 1}`].value
    userAnswers.push(userAnswer)
  })
  return userAnswers
}

//caucula o resultado
const calculateUserScore = userAnswers => {
  if (!wasAnswered) {
    userAnswers.forEach((userAnswer, index) => {
      //caso resposta certa adiciona a pontuação
      const isUserAnswerCorrect = userAnswer === correctAnswers[index]
      if (isUserAnswerCorrect) {
        scoreScript += percentual
      }
    })
  }
}

//sobe a página para o topo da aplicação e mostra o resultado
const showFinalScore = () => {
  scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
  finalScoreContainer.classList.remove('d-none')
}


//mostra mensagem conforme a pontuação
const showBruxoOuTrouxa = () => {
  const showBruxoOuTrouxa = bruxoOuTrouxa.querySelector('span') 
  console.log(scoreScript)
  if (scoreScript >= 50) {
    showBruxoOuTrouxa.textContent = '" Bruxo "'
  } else {
    showBruxoOuTrouxa.textContent = '" Trouxa "'
  }
  setTimeout(() => {
    bruxoOuTrouxa.classList.remove('d-none')
  }, 1000)
}

//anima a pontuação do resultado final
const animateFinalScore = () => {
  let counter = 0
  const timer = setInterval(() => {
    if (counter === scoreScript) {
      clearInterval(timer)
      showBruxoOuTrouxa()
    }
    finalScoreContainer.querySelector('span').textContent = `${counter++}%`
  }, 20)

  wasAnswered = true//evita soma do resultado repetidas vezes
}

//envia o form
const onsubmitAnswers = event => {
  event.preventDefault() //evita que o form seja enviado

  const userAnswers = getUserAswers()

  calculateUserScore(userAnswers)
  showFinalScore()
  animateFinalScore()
}

//adiciona um ouvinte ao form
form.addEventListener('submit', onsubmitAnswers)
