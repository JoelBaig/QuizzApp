let currentQuestion = 0;
let rightQuestions = 0;
let audio_success = new Audio('audio/success.mp3');
let audio_fail = new Audio('audio/miss.mp3');
let audio_atmosphere = new Audio('audio/atmosphere.mp3');

function init() {
    document.getElementById('question-counter').innerHTML = questions.length;
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
    playBackgroundAudio();
}

function playBackgroundAudio() {
    audio_atmosphere.play();
    audio_atmosphere.loop = true;
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('card').classList.add('d-none');
    document.getElementById('end-screen').classList.remove('d-none');
    document.getElementById('question-amount').innerHTML = questions.length;
    document.getElementById('right-questions-amount').innerHTML = rightQuestions;
}

function updateProgressBar() {
    showProgressInPercent();
}

function showProgressInPercent() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}

function updateToNextQuestion() {
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

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    checkAnswerRightOrWrong(selectedQuestionNumber, question, selection, idOfRightAnswer);
    disableAnswers();
    enableNextQuestionBtn();
}

function checkAnswerRightOrWrong(selectedQuestionNumber, question, selection, idOfRightAnswer) {
    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        showAnswerSuccessed(selection);
    } else {
        showAnswerFailed(idOfRightAnswer, selection);
    }
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}

function showAnswerSuccessed(selection) {
    document.getElementById(selection).classList.add('bg-success');
    audio_success.play();
    rightQuestions++;
}

function showAnswerFailed(idOfRightAnswer, selection) {
    document.getElementById(selection).classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).classList.add('bg-success');
    audio_fail.play();
}

function enableNextQuestionBtn() {
    document.getElementById('next-question-btn').disabled = false;
}

function disableAnswers() {
    document.getElementById('answer_1').parentNode.style = 'pointer-events: none';
    document.getElementById('answer_2').parentNode.style = 'pointer-events: none';
    document.getElementById('answer_3').parentNode.style = 'pointer-events: none';
    document.getElementById('answer_4').parentNode.style = 'pointer-events: none';
}

function enableAnswers() {
    document.getElementById('answer_1').parentNode.style = 'pointer-events: click';
    document.getElementById('answer_2').parentNode.style = 'pointer-events: click';
    document.getElementById('answer_3').parentNode.style = 'pointer-events: click';
    document.getElementById('answer_4').parentNode.style = 'pointer-events: click';
}

function nextQuestion() {
    currentQuestion++;
    disableNextQuestionBtn();
    resetAnswerButtons();
    showQuestion();
    enableAnswers();
    init();
}

function disableNextQuestionBtn() {
    document.getElementById('next-question-btn').disabled = true;
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

function restartQuiz() {
    document.getElementById('card').style = '';
    document.getElementById('end-screen').classList.add('d-none');
    currentQuestion = 0;
    rightQuestions = 0;
    showQuestion();
    init();
}
