//pega a referencia do form com as perguntas
const form = document.querySelector('.quiz-form')
//array contendo as respostas certas das perguntas da tela do Quiz
const correctAnswers = ['C', 'A', 'C', 'B', 'A']

//adiciona um ouvinte ao form
form.addEventListener('submit', event => {
    event.preventDefault()//evita que o form seja enviado

    let score = 0
    //armazena as resposta do usuário no array 'userAnswers'
    const userAnswers = [
        form.inputQuestion1.value,
        form.inputQuestion2.value,
        form.inputQuestion3.value,
        form.inputQuestion4.value,
        form.inputQuestion5.value
    ]

    //verifica as resposta do usuário e adiciona a pontuação
    userAnswers.forEach((userAnswer, index) => {
        //caso resposta certa +20
        if(userAnswer === correctAnswers[index]){
            score += 20
        }
    })
    console.log(score)//mostra no console os pontos do usuário

})

