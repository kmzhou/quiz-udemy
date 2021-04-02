let quizzes = [];
let select;


/**
 * fetch quizzes from firestore database through the backend api, returns the json response
 */
async function get_quizzes() {
    const fetch_q = await fetch('http://localhost:3000/get_quizzes')
    const fetch_res = await fetch_q.json();
    return fetch_res;
};

/**
 * for each quiz in the json response, store the name of the quiz and display the list of names
 */
get_quizzes().then(fetch_res => {
    fetch_res.forEach(quiz => {
        quizzes.push(quiz.name);
    });
    quiz();
});


/**
 * creates a div containing the quiz name for each quiz in the quizzes array
 * adds an event listener for when the user selects a quiz; the quiz selected is passed as an 
 * argument when redirecting to the quiz's url
 */
function quiz() {
    for (let i = 0; i < quizzes.length; i++) {
        let element = document.getElementById('quiz_list').appendChild(document.createElement('div'));
        // console.log(element)
        element.setAttribute('class', 'quiz');
        element.setAttribute('id', quizzes[i]);
        element.innerHTML = quizzes[i];
        element.addEventListener('click', function () {
            select = element.id;
            window.location.href = '/quiz/' + select;
        })
    }
}
