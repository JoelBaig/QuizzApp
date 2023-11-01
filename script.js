let currentQuestion = 0;

function init() {
    document.getElementById('question-counter').innerHTML = questions.length;
    showQuestion();
    showAnswer();
}

function showQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-text').innerHTML = question['question'];
}

function showAnswer() {
    let answer = questions[currentQuestion];
    document.getElementById('answer_1').innerHTML = answer['answer_1'];
    document.getElementById('answer_2').innerHTML = answer['answer_2'];
    document.getElementById('answer_3').innerHTML = answer['answer_3'];
    document.getElementById('answer_4').innerHTML = answer['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).classList.add('bg-success');
    } else {
        document.getElementById(selection).classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).classList.add('bg-success');
    }
    document.getElementById('next-question-btn').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    init();
}