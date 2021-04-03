# quiz-udemy
A quiz-taking system with a frontend UI that allows users to choose and take a quiz, and pulls questions from the database with a backend API. The full stack application is built using Node.js, Express, and Firestore. 

# Problem
Build a quiz-taking system for quizzes that contain one or more multiple choice questions, and displays the results of the quiz when the user complete it. 

# Solution
### Backend:

The backend uses Firestore database with 2 collections, one containing the names of the quizzes, and the other containing all the questions. The document for each question contains the following:
- Quiz the question is from 
- Question
- Array of choices
- Index of the correct answer (relative to the array of choices)

The API has two endpoints:
- localhost:3000/get_quizzes: obtains all documents in the 'quizzes' collection
- localhost:3000/get_questions: obtains all documents in the 'questions' collection
JSON responses are filtered and parsed outside of the API call

### Frontend UI:

Homepage: 

Displays a list of the quizzes that the user can take, parsed from the response of get_quizzes.

Quiz:

Uses the location hash to determine whether to display the quiz or the quiz results.  The location hash is used in order to streamline the flow of the code and prevent duplicate code. 
Each question in the quiz is displayed individually, with the answer choices listed under the question. The user must make a choice before moving on to the next question. The user can return back to the home page at any point. 

The results page shows the user's score, and lists the questions from the quiz. The questions that the user answered correctly are highlighted in green, and those that were answered incorrectly are highlighted in red. The user can click on any question expand the question, displaying all the answer choices. The user's answer will always be highlighted in red or green depending on the correctness of the choice, and the correct answer will be highlighted in green. 



# Installation
1. Install Node.js and npm:
```
$ brew install node
```
2. Install the dependencies from the command line:
```
$ npm install
```
3. Run the web application by going to the the following url:
```
http://localhost:3000/
```


