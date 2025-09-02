const quizData = [
  {
    question: "What is the capital of the Philippines?",
    options: ["Cebu", "Manila", "Mindanao", "Davao"],
    answer: 1
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: 3
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks Text Mark Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Tool Multi Language"
    ],
    answer: 1
  },
  {
    question: "What year was JavaScript created?",
    options: ["1995", "2000", "1992", "1998"],
    answer: 0
  },
  {
    question: "Who is the founder of Microsoft?",
    options: ["Steve Jobs", "Elon Musk", "Bill Gates", "Mark Zuckerberg"],
    answer: 2
  }
];

let current = 0;
let score = 0;
let timerId = null;
let timeLeft = 10;

const questionEl = document.getElementById("question");
const optionsEl  = document.getElementById("options");
const nextBtn    = document.getElementById("next-btn");
const timerEl    = document.getElementById("timer");
const resultBox  = document.getElementById("quiz-result");
const scoreText  = document.getElementById("score-text");
const retakeBtn  = document.getElementById("retake-btn");

function startTimer() {
  clearInterval(timerId);
  timeLeft = 10;
  timerEl.textContent = `Time left: ${timeLeft} seconds`;

  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft} seconds`;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      autoNext();
    }
  }, 1000);
}

function loadQuestion() {
  if (current >= quizData.length) return showResult();

  optionsEl.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  questionEl.classList.remove("hidden");
  timerEl.classList.remove("hidden");
  resultBox.classList.add("hidden");

  const q = quizData[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((text, idx) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = text;
    btn.dataset.index = idx;
    btn.addEventListener("click", () => selectAnswer(idx, btn));
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function disableOptions() {
  [...optionsEl.children].forEach(b => (b.disabled = true));
}

function selectAnswer(selectedIdx, btn) {
  clearInterval(timerId);
  disableOptions();

  const correctIdx = quizData[current].answer;
  if (selectedIdx === correctIdx) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    const correctBtn = optionsEl.children[correctIdx];
    if (correctBtn) correctBtn.classList.add("correct");
  }
}

function autoNext() {
  disableOptions();
  const correctIdx = quizData[current].answer;
  const correctBtn = optionsEl.children[correctIdx];
  if (correctBtn) correctBtn.classList.add("correct");

  setTimeout(() => {
    current++;
    if (current < quizData.length) loadQuestion();
    else showResult();
  }, 1000);
}

function showResult() {
  questionEl.classList.add("hidden");
  optionsEl.classList.add("hidden");
  nextBtn.classList.add("hidden");
  timerEl.classList.add("hidden");

  resultBox.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${quizData.length}`;
}

function resetQuiz() {
  current = 0;
  score = 0;
  loadQuestion();
}

nextBtn.addEventListener("click", () => {
  clearInterval(timerId);
  current++;
  if (current < quizData.length) loadQuestion();
  else showResult();
});

retakeBtn.addEventListener("click", resetQuiz);

loadQuestion();
