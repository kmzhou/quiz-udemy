
let score = 0;
let curr_question_num = 0;
let curr_question;
let questions = []; // array of questions
let handler = []; // used to track event listeners

/**
 * fetch questions from the firestore database where the associated quiz is the one selected
 * @returns json response containing the question objects
 */
async function get_questions() {
    const url = 'http://localhost:3000/get_questions/' + selected;
    const fetch_q = await fetch(url);
    const fetch_res = await fetch_q.json();
    return fetch_res;
};

/**
 * appends each question from the json response to the locally defined array for easy access
 * sets location.hash to display the appropriate HTML elements
 * calls load_questions() to display the quiz's first question
 */
get_questions().then(fetch_res => {
    fetch_res.forEach(q => {
        questions.push(q)
    })
    console.log(questions);

    if (!location.hash) {
        window.location.hash = '#quiz';
    }
    load_question();
});

window.addEventListener('hashchange', show_page);

/**
 * displays the appropriate content depending on location.hash; hides all content except
 * the content corresponding to the hash
 */
function show_page() {
    let pages = document.getElementsByClassName('page')
    for (p of pages) {
        p.style.display = 'none';
    }

    // substr(1) removes the '#' character at the beginning of location.hash
    document.getElementById(location.hash.substr(1)).style.display = 'block';
}

/**
 * displays the current quiz question
 */
function load_question() {

    // when all questions have been completed, the results page is displayed by 
    // updating location.hash
    if (curr_question_num == questions.length) {
        window.location.hash = '#results'
        load_results();
        return;
    }

    // increment and display question number
    curr_question_num++;
    document.getElementById('q_number').innerHTML = curr_question_num.toString() + ' / ' + questions.length.toString();

    // displays the question and the answer choices as buttons
    curr_question = questions[curr_question_num - 1];
    document.getElementById('question_text').innerHTML = curr_question.question;
    for (let i = 0; i < curr_question.choices.length; i++) {
        let element = document.getElementById('choice_' + i)
        element.innerHTML = curr_question.choices[i];
        element.style.backgroundColor = "antiquewhite";
        element.disabled = false;

        // adds an event listener to each answer choice button
        // binds the index of the choice to the choose function, called when the event listener is triggered
        const e = choose.bind(this, i);
        handler.push(e)
        element.addEventListener('click', e);
    }

    // disables the 'next' button until the user selects an answer
    // displays the next question when the 'next' button is clicked
    const next = document.getElementById('next');
    next.disabled = true;
    next.addEventListener('click', load_question)
}

/**
 * triggered when the user selects an answer choice
 * indicates if the user's choice was correct or incorrect
 * @param {number} i : index of the answer choice
 */
let choose = function (i) {

    // curr_question.correct_answer: index of the correct answer
    // if the index of answer the user chose matches that of the correct answer, the user's answer choice is highlighted green, otherwise red
    // stores the index of the user's answer
    if (i === curr_question.correct_answer) {
        document.getElementById('choice_' + i).style.backgroundColor = "lightgreen";
        // questions[curr_question_num - 1].ans = i;
        score++;
    }
    else {
        document.getElementById('choice_' + i).style.backgroundColor = "lightcoral";
    }
    questions[curr_question_num - 1].ans = i;

    // removes event listeners on the question's answer choices, and disables the buttons
    const choices = document.getElementsByClassName('choice');
    for (let j = 0; j < choices.length; j++) {
        choices[j].disabled = true;
        remove_listeners()
    }

    // enables the 'next' button to allow the user to move to the next question
    next.disabled = false;
}


/**
 * removes event lsiteners from the answer choice buttons by referencing the functions saved
 * in the handler array
 */
function remove_listeners() {
    const choices = document.getElementsByClassName('choice');
    for (let i = 0; i < choices.length; i++) {
        choices[i].removeEventListener('click', handler[i]);
    }
    handler = [];
}


/**
 * after the user finishes the quiz, their score is displayed as a percentage
 * lists all the questions in the quiz and indicates whether or not the user answered them correctly
 * each question expands to display the whole question (question and answer choices), the correct answer, and the user's answer
 */
function load_results() {
    document.getElementById('quiz_name').innerHTML = selected + ' Quiz';
    document.getElementById('final_score').innerHTML = Math.round((score / questions.length) * 100) + '%';

    // loop over all the questions
    for (let i = 0; i < questions.length; i++) {
        // create question list
        let element = document.getElementById('questions').appendChild(document.createElement('div'));
        element.setAttribute('class', 'q');
        element.setAttribute('id', i);
        element.innerHTML = questions[i].question;

        // indicates whether the question was answered correctly or not by the color of the border
        element.style.border = 'thick solid';
        if (questions[i].ans == questions[i].correct_answer) {
            element.style.borderColor = 'lightgreen';
        }
        else {
            element.style.borderColor = 'lightcoral';
        }

        // event listener that displays the whole question when a question is clicked
        element.addEventListener('click', function () {
            expand(i)
        });

    }
}

/**
 * displays the selected question and its answer choices, the correct answer, and the user's
 * answer if it was incorrect
 * @param {number} q : question number
 */
function expand(q) {
    let selected_q = questions[q]

    // hides the question list, and displays the selected question and its answer choices
    document.getElementById('expand').style.display = 'block';
    document.getElementById('questions').style.display = 'none';
    document.getElementById('res_question_text').innerHTML = selected_q.question;
    for (let i = 0; i < selected_q.choices.length; i++) {
        document.getElementById('res_choice_' + i).innerHTML = selected_q.choices[i];
        document.getElementById('res_choice_' + i).style.backgroundColor = 'antiquewhite';
    }

    // highlights the correct answer green and the user's choice, if incorrect, red
    document.getElementById('res_choice_' + selected_q.correct_answer).style.backgroundColor = "lightgreen";
    if (selected_q.ans != selected_q.correct_answer) {
        document.getElementById('res_choice_' + selected_q.ans).style.backgroundColor = "lightcoral";
    }

    document.getElementById('back').addEventListener('click', back);

}

/**
 * redisplays the question list, and hides the selected question
 */
function back() {
    document.getElementById('expand').style.display = 'none';
    document.getElementById('questions').style.display = 'block';
}