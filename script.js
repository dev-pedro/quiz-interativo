const form = document.querySelector('.quiz-form')
const finalScoreContainer = document.querySelector('.final-score-container')
const divQuestion = document.querySelector('.questions')
let correctAnswers = ['2', '1', '0', '2', '0', '2', '1', '1', '3', '1']
let scoreScript = 0
let percentualAsked = Math.round(100 / correctAnswers.length)
let wasAnswered = false
let templateHTML = ''

const questions = [
  {
    number: 1,
    title: 'Qual é a varinha das varinhas?',
    options: [
      'Varinha de Harry Potter',
      'Varinha de Lord Voldemort',
      'Varinha de Alvo Dumbledore'
    ],
    correctAnswer: '2'
  },
  {
    number: 2,
    title: 'Qual é a casa de Hogwarts de Harry Potter?',
    options: ['Grifinória', 'Sonserina', 'Lufa-Lufa', 'Corvinal'],
    correctAnswer: '1'
  },
  {
    number: 3,
    title:
      'Qual é o nome do diretor da Escola de Magia e Bruxaria de Hogwarts?',
    options: [
      'Alvo Dumbledore',
      'Minerva McGonagall',
      'Severo Snape',
      'Dolores Umbridge'
    ],
    correctAnswer: '0'
  },
  {
    number: 4,
    title:
      'Qual é a criatura que guarda a Pedra Filosofal em Harry Potter e a Pedra Filosofal?',
    options: ['Dragão', 'Unicórnio', 'Cerbero', 'Fênix'],
    correctAnswer: '2'
  },
  {
    number: 5,
    title: 'Quem é o melhor amigo de Harry Potter?',
    options: [
      'Ron Weasley',
      'Hermione Granger',
      'Draco Malfoy',
      'Neville Longbottom'
    ],
    correctAnswer: '0'
  },
  {
    number: 6,
    title: 'Qual é o patrono de Harry Potter?',
    options: ['Gato', 'Coruja', 'Cervo', 'Cão'],
    correctAnswer: '2'
  },
  {
    number: 7,
    title:
      'Qual é o feitiço que Harry Potter usa para derrotar Lord Voldemort no final da série?',
    options: ['Avada Kedavra', 'Expelliarmus', 'Imperio', 'Crucio'],
    correctAnswer: '1'
  },
  {
    number: 8,
    title: 'Qual é o nome do animal de estimação de Hermione Granger?',
    options: ['Edwiges', 'Crookshanks', 'Pigwidgeon', 'Nagini'],
    correctAnswer: '1'
  },
  {
    number: 9,
    title: 'Qual é o nome do irmão mais velho de Ron Weasley?',
    options: ['Charlie', 'Percy', 'Fred', 'George'],
    correctAnswer: '3'
  },
  {
    number: 10,
    title: 'Qual é o nome do elfo doméstico que ajuda Harry Potter?',
    options: ['Kreacher', 'Dobby', 'Winky', 'Hokey'],
    correctAnswer: '1'
  }
]

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
  questions.forEach(({ number, title, options }) => {
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
//chama a função para carregar os inputs no index
insertAsketsOnIndexHTML(questions)

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
        scoreScript += percentualAsked
      }
    })
  }
}

//envia o form
const onsubmitAnswers = event => {
  event.preventDefault() //evita que o form seja enviado

  const userAnswers = getUserAswers()

  calculateUserScore(userAnswers)

  scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
  finalScoreContainer.classList.remove('d-none')

  finalScoreContainer.querySelector('span').textContent = scoreScript + '%'

}

//adiciona um ouvinte ao form
form.addEventListener('submit', onsubmitAnswers)
