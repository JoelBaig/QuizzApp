let currentQuestion = 0;
let rightQuestions = 0;

function init() {
    document.getElementById('question-counter').innerHTML = questions.length;
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById('card').classList.add('d-none');
        document.getElementById('end-screen').classList.remove('d-none');
        document.getElementById('question-amount').innerHTML = questions.length;
        document.getElementById('right-questions-amount').innerHTML = rightQuestions;
    } else {
        let question = questions[currentQuestion];
        document.getElementById('start-screen').classList.add('d-none');
        document.getElementById('card').classList.remove('d-none');
        document.getElementById('question-number').innerHTML = currentQuestion + 1;
        document.getElementById('question-text').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
    }
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).classList.add('bg-success');
        rightQuestions++;
    } else {
        document.getElementById(selection).classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).classList.add('bg-success');
    }
    document.getElementById('next-question-btn').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-question-btn').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').classList.remove('bg-danger');
    document.getElementById('answer_1').classList.remove('bg-success');
    document.getElementById('answer_2').classList.remove('bg-danger');
    document.getElementById('answer_2').classList.remove('bg-success');
    document.getElementById('answer_3').classList.remove('bg-danger');
    document.getElementById('answer_3').classList.remove('bg-success');
    document.getElementById('answer_4').classList.remove('bg-danger');
    document.getElementById('answer_4').classList.remove('bg-success');
}
