
var express = require('express');
var router = express.Router();
const db = require('./db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Quiz Yourself' });
});

/* GET selected quiz page */
router.get('/quiz/:selected', function (req, res, next) {
  res.render('quiz', { selected: req.params.selected })
});

/* GET all quizzes from the database */
router.get('/get_quizzes', async (req, res) => {

  // references the initialized db obect export from the db.js file
  const query = db.db.collection('quizzes');
  const snapshot = await query.get();
  let r = []

  snapshot.forEach(doc => {
    r.push(doc.data());
  });
  if (r.length > 0) {
    res.send(r);
  }
  else {
    res.json({ status: 'not found' });
  }
})

/**
 * GET all questions from the database, filters out all questions that do not 
 * correspond to the selected quiz 
 */
router.get('/get_questions/:quiz', async (req, res) => {
  const q = req.params.quiz;
  const query = db.db.collection('questions');
  const snapshot = await query.get();
  let r = [];

  // res.json(snapshot[0].data());
  snapshot.forEach(doc => {
    if (doc.data().quiz == q) {
      r.push(doc.data());
    }
  });

  if (r.length > 0) {
    res.send(r);
  }
  else {
    res.json({ status: 'not found' });
  }
});

module.exports = router;

