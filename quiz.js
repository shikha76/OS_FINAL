// Operating System Questions Database
const osQuestions = [
    // CPU Scheduling Questions
    {
        question: "Which scheduling algorithm is best for processes with equal burst time?",
        options: ["FCFS", "SJF", "Round Robin", "Priority"],
        correct: 0,
        explanation: "FCFS (First Come First Serve) is most suitable for processes with equal burst time as it provides fair execution order based on arrival time."
    },
    {
        question: "Which algorithm may cause starvation?",
        options: ["FCFS", "SJF", "Round Robin", "Priority"],
        correct: 1,
        explanation: "SJF can cause starvation because if shorter processes keep arriving, longer processes might never get CPU time."
    },
    {
        question: "What is the main disadvantage of FCFS scheduling?",
        options: ["High overhead", "Convoy effect", "Complex implementation", "High context switching"],
        correct: 1,
        explanation: "The convoy effect occurs when all processes wait for one big process to finish, leading to poor average waiting time."
    },
    {
        question: "Which scheduling algorithm is best for time-sharing systems?",
        options: ["FCFS", "SJF", "Round Robin", "LIFO"],
        correct: 2,
        explanation: "Round Robin is ideal for time-sharing systems as it gives each process a fair time slice and ensures good response time."
    },

    // Process Synchronization Questions
    {
        question: "What is the primary purpose of process synchronization?",
        options: [
            "To manage shared resources",
            "To increase CPU speed",
            "To reduce memory usage",
            "To improve I/O operations"
        ],
        correct: 0,
        explanation: "Process synchronization is primarily used to manage access to shared resources and prevent race conditions."
    },
    {
        question: "What problem does the Peterson's Solution solve?",
        options: [
            "Critical Section",
            "Deadlock",
            "Starvation",
            "Priority Inversion"
        ],
        correct: 0,
        explanation: "Peterson's Solution is an algorithm that solves the critical section problem for two processes."
    },

    // Memory Management Questions
    {
        question: "What is the purpose of paging in memory management?",
        options: [
            "To reduce external fragmentation",
            "To increase CPU utilization",
            "To improve I/O performance",
            "To reduce process execution time"
        ],
        correct: 0,
        explanation: "Paging is used to reduce external fragmentation by dividing memory into fixed-size blocks called pages."
    },
    {
        question: "In virtual memory management, what is thrashing?",
        options: [
            "When a process spends more time paging than executing",
            "When memory becomes corrupted",
            "When CPU utilization is too high",
            "When disk space is full"
        ],
        correct: 0,
        explanation: "Thrashing occurs when a process spends more time paging (swapping pages in/out) than executing actual instructions."
    },

    // Deadlock Questions
    {
        question: "Which of these is NOT a necessary condition for deadlock?",
        options: [
            "High CPU utilization",
            "Mutual Exclusion",
            "Hold and Wait",
            "Circular Wait"
        ],
        correct: 0,
        explanation: "The four necessary conditions for deadlock are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. CPU utilization is not a condition."
    },
    {
        question: "What is resource allocation graph used for?",
        options: [
            "Detecting deadlock possibility",
            "Managing memory allocation",
            "Scheduling processes",
            "Managing file systems"
        ],
        correct: 0,
        explanation: "Resource allocation graph is used to detect the possibility of deadlock by showing the relationship between processes and resources."
    },

    // File System Questions
    {
        question: "What is the purpose of journaling in a file system?",
        options: [
            "To recover from system crashes",
            "To increase storage capacity",
            "To improve read performance",
            "To reduce file fragmentation"
        ],
        correct: 0,
        explanation: "Journaling keeps track of file system changes to help recover from crashes or improper shutdowns."
    },
    {
        question: "Which file allocation method suffers from external fragmentation?",
        options: [
            "Contiguous allocation",
            "Linked allocation",
            "Indexed allocation",
            "None of the above"
        ],
        correct: 0,
        explanation: "Contiguous allocation suffers from external fragmentation as files must be stored in consecutive blocks."
    },

    // Process Management Questions
    {
        question: "What is the difference between a process and a thread?",
        options: [
            "Threads share resources while processes have independent resources",
            "Processes are faster than threads",
            "Threads use more memory than processes",
            "Processes can only run one at a time"
        ],
        correct: 0,
        explanation: "Threads within the same process share resources (memory space, file handles) while processes have their own independent resources."
    },
    {
        question: "What is the purpose of the Process Control Block (PCB)?",
        options: [
            "To store process information and state",
            "To control CPU speed",
            "To manage file systems",
            "To handle I/O operations"
        ],
        correct: 0,
        explanation: "PCB stores all the information about a process including its state, registers, scheduling info, memory info, etc."
    },

    // CPU Scheduling Advanced Questions
    {
        question: "What happens in Round Robin if the time quantum is too small?",
        options: [
            "High context switching overhead",
            "Processes never complete",
            "CPU becomes idle",
            "Memory overflow"
        ],
        correct: 0,
        explanation: "If the time quantum is too small, too much time is spent on context switching between processes, reducing CPU efficiency."
    },

    // Add these new scenario-based questions after existing questions
    {
        question: "Given processes: P1(burst=4, arrival=0), P2(burst=2, arrival=1), P3(burst=3, arrival=2). Which algorithm will give minimum average waiting time?",
        options: [
            "SJF",
            "FCFS",
            "Round Robin",
            "Priority Scheduling"
        ],
        correct: 0,
        explanation: "SJF is optimal for minimizing average waiting time. Here, SJF order would be: P2(2) → P3(3) → P1(4), giving minimum average waiting time."
    },
    {
        question: "For a system running multiple interactive user programs (like text editors), which scheduling algorithm is most suitable?",
        options: [
            "Round Robin",
            "FCFS",
            "SJF",
            "LIFO"
        ],
        correct: 0,
        explanation: "Round Robin is best for interactive programs as it provides fair CPU time to all processes and ensures good response time for all users."
    },
    {
        question: "In a batch processing system with jobs of varying lengths, which scheduling algorithm would be most efficient?",
        options: [
            "Shortest Job First (SJF)",
            "Round Robin",
            "FCFS",
            "Random Scheduling"
        ],
        correct: 0,
        explanation: "SJF is most efficient for batch processing as it minimizes average waiting time when job lengths are known and no interaction is required."
    },
    {
        question: "For real-time processes with different priorities (e.g., aircraft control systems), which scheduling algorithm is most appropriate?",
        options: [
            "Priority Scheduling",
            "FCFS",
            "Round Robin",
            "SJF"
        ],
        correct: 0,
        explanation: "Priority Scheduling is best for real-time systems where certain processes must be executed before others based on their importance/urgency."
    },
    {
        question: "Given: P1(burst=6, priority=3), P2(burst=4, priority=1), P3(burst=2, priority=4). With Priority Scheduling (lower number = higher priority), what's the execution order?",
        options: [
            "P2 → P1 → P3",
            "P3 → P1 → P2",
            "P1 → P2 → P3",
            "P2 → P3 → P1"
        ],
        correct: 0,
        explanation: "With Priority Scheduling (lower number = higher priority), P2 executes first (priority 1), then P1 (priority 3), and finally P3 (priority 4)."
    },
    {
        question: "For a system where all processes have similar burst times but different arrival times, which algorithm is most fair?",
        options: [
            "FCFS",
            "SJF",
            "SRTF",
            "Priority"
        ],
        correct: 0,
        explanation: "FCFS is most fair when processes have similar burst times as it prevents starvation and provides equal opportunity based on arrival time."
    },
    {
        question: "In a system with: P1(CPU-bound, long bursts), P2(I/O-bound, short bursts), which scheduling algorithm best balances their needs?",
        options: [
            "Round Robin with appropriate quantum",
            "FCFS",
            "LIFO",
            "Random scheduling"
        ],
        correct: 0,
        explanation: "Round Robin with appropriate quantum ensures I/O-bound process (P2) gets frequent CPU time while CPU-bound process (P1) gets fair execution time."
    },
    {
        question: "Given processes with burst times: [10,4,5,2,1], which algorithm will result in minimum average turnaround time?",
        options: [
            "SJF",
            "FCFS",
            "LIFO",
            "Random"
        ],
        correct: 0,
        explanation: "SJF would execute in order: 1→2→4→5→10, minimizing average turnaround time by completing shorter processes first."
    },
    {
        question: "For a web server handling multiple client requests, which scheduling algorithm provides the best response time?",
        options: [
            "Round Robin",
            "FCFS",
            "LIFO",
            "SJF"
        ],
        correct: 0,
        explanation: "Round Robin ensures fair handling of all client requests and prevents any request from waiting too long, ideal for web servers."
    },
    {
        question: "Given: P1(burst=8), P2(burst=4), P3(burst=2) with Round Robin(quantum=2), what will be the completion order of processes?",
        options: [
            "P3 → P2 → P1",
            "P1 → P2 → P3",
            "P2 → P3 → P1",
            "They complete simultaneously"
        ],
        correct: 0,
        explanation: "With RR(q=2): P1(2)→P2(2)→P3(2complete)→P1(2)→P2(2complete)→P1(4). Therefore, P3 finishes first, then P2, finally P1."
    }
];

let quizQuestions = [];
let selectedQuestionCount = 0;
let currentTopic = 'cpu';
let currentQuestionIndex = 0;
let score = 0;
let questionsAnswered = 0;

// Initialize quiz
function initializeQuiz() {
    document.getElementById('quizSetup').style.display = 'block';
    document.getElementById('mainQuiz').style.display = 'none';
    document.getElementById('questionCount').max = osQuestions.length;
}

// Add event listener for page load
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

// Start quiz with selected settings
function startQuizWithSettings() {
    const questionCount = parseInt(document.getElementById('questionCount').value);
    
    if (questionCount < 5 || questionCount > osQuestions.length) {
        alert(`Please select between 5 and ${osQuestions.length} questions.`);
        return;
    }

    const selectedTopics = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    if (selectedTopics.length === 0) {
        alert('Please select at least one topic.');
        return;
    }

    const filteredQuestions = osQuestions.filter(q => {
        const questionText = q.question.toLowerCase();
        return (selectedTopics.includes('scheduling') && (questionText.includes('scheduling') || questionText.includes('process') || questionText.includes('burst time'))) ||
               (selectedTopics.includes('synchronization') && (questionText.includes('synchronization') || questionText.includes('mutex') || questionText.includes('semaphore'))) ||
               (selectedTopics.includes('memory') && (questionText.includes('memory') || questionText.includes('paging') || questionText.includes('virtual'))) ||
               (selectedTopics.includes('deadlock') && (questionText.includes('deadlock') || questionText.includes('resource')));
    });

    if (filteredQuestions.length < questionCount) {
        alert(`Not enough questions available for selected topics. Available: ${filteredQuestions.length}`);
        return;
    }

    selectedQuestionCount = questionCount;
    quizQuestions = shuffleArray([...filteredQuestions]).slice(0, questionCount);

    document.getElementById('quizSetup').style.display = 'none';
    document.getElementById('mainQuiz').style.display = 'block';
    document.getElementById('totalQuestions').textContent = questionCount;
    document.getElementById('maxScore').textContent = questionCount;

    resetQuizState();
    showQuestion(0);
}

// Reset quiz state
function resetQuizState() {
    currentQuestionIndex = 0;
    score = 0;
    questionsAnswered = 0;
}

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Show question
function showQuestion(index) {
    const question = quizQuestions[index];
    const quizContainer = document.getElementById('quizContainer');
    
    document.getElementById('currentQuestion').textContent = index + 1;
    document.getElementById('progressBar').style.width = `${((index + 1) / quizQuestions.length) * 100}%`;

    quizContainer.innerHTML = `
        <div class="quiz-question">
            <h3>Question ${index + 1}:</h3>
            <p>${decodeHTMLEntities(question.question)}</p>
            <div class="quiz-options">
                ${question.options.map((option, i) => `
                    <div class="quiz-option" onclick="selectAnswer(${i})">
                        ${decodeHTMLEntities(option)}
                    </div>
                `).join('')}
            </div>
            <div id="feedback" class="quiz-feedback"></div>
            <div id="explanation" class="explanation-box"></div>
        </div>
    `;
}

// Handle answer selection
function selectAnswer(optionIndex) {
    if (questionsAnswered > currentQuestionIndex) return;

    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('feedback');
    const explanation = document.getElementById('explanation');
    
    options.forEach(opt => opt.style.pointerEvents = 'none');
    
    const isCorrect = optionIndex === question.correct;
    options[optionIndex].style.backgroundColor = isCorrect ? '#2ecc71' : '#e74c3c';
    
    if (!isCorrect) {
        options[question.correct].style.backgroundColor = '#2ecc71';
    }
    
    feedback.innerHTML = isCorrect ? '✅ Correct!' : '❌ Incorrect!';
    feedback.className = `quiz-feedback feedback-${isCorrect ? 'correct' : 'incorrect'}`;
    
    if (isCorrect) score++;
    
    feedback.style.display = 'block';
    explanation.innerHTML = question.explanation;
    explanation.style.display = 'block';
    
    document.getElementById('currentScore').textContent = score;
    questionsAnswered++;

    setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            quizContainer.innerHTML += `
                <button onclick="nextQuestion()" class="btn-add" style="margin-top: 20px;">
                    Next Question
                </button>
            `;
        } else {
            completeQuiz();
        }
    }, 1000);
}

// Utility functions
function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

function hideDialog(dialogId) {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById(dialogId).style.display = 'none';
}

// Quiz navigation functions
function nextQuestion() {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
}

function completeQuiz() {
    const percentage = (score / selectedQuestionCount) * 100;
    document.getElementById('quizComplete').style.display = 'block';
    document.getElementById('finalScore').textContent = percentage.toFixed(1);
    
    const performanceMessage = percentage >= 90 ? 'Excellent! You have a great understanding of OS concepts!' :
                              percentage >= 70 ? 'Good job! You understand most OS concepts well.' :
                              percentage >= 50 ? 'Not bad! But there\'s room for improvement.' :
                              'You might want to review the OS concepts again.';
    
    document.getElementById('quizComplete').innerHTML += `
        <p class="performance-message">${performanceMessage}</p>
    `;
}

function restartQuiz() {
    resetQuizState();
    document.getElementById('quizComplete').style.display = 'none';
    document.getElementById('mainQuiz').style.display = 'none';
    document.getElementById('quizSetup').style.display = 'block';
}

// Dialog management
function confirmStopQuiz() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('stopConfirmation').style.display = 'block';
}

function confirmExit() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('exitConfirmation').style.display = 'block';
}

function hideConfirmation() {
    hideDialog('stopConfirmation');
}

function hideExitConfirmation() {
    hideDialog('exitConfirmation');
}

function stopQuiz() {
    const percentage = (score / quizQuestions.length) * 100;
    document.getElementById('quizContainer').innerHTML = `
        <div class="quiz-complete" style="display: block;">
            <h2>Quiz Stopped</h2>
            <p>Your score:</p>
            <div class="score">
                ${score} out of ${quizQuestions.length} (${percentage.toFixed(1)}%)
            </div>
            <p>Questions attempted: ${questionsAnswered} out of ${quizQuestions.length}</p>
            <div class="action-buttons">
                <button onclick="restartQuiz()" class="btn-restart">Try Again</button>
                <button onclick="window.close()" class="btn-home">Close Quiz</button>
            </div>
        </div>
    `;
    hideConfirmation();
}

function exitQuiz() {
    const percentage = (score / selectedQuestionCount) * 100;
    document.getElementById('quizContainer').innerHTML = `
        <div class="quiz-complete" style="display: block;">
            <h2>Quiz Summary</h2>
            <p>Here's how you did:</p>
            <div class="score">
                ${score} out of ${selectedQuestionCount} (${percentage.toFixed(1)}%)
            </div>
            <p>Questions attempted: ${questionsAnswered} out of ${selectedQuestionCount}</p>
            <div class="action-buttons">
                <button onclick="restartQuiz()" class="btn-restart">Try Again</button>
                <button onclick="returnToSimulator()" class="btn-home">Return to Simulator</button>
            </div>
        </div>
    `;
    hideExitConfirmation();
}

function returnToSimulator() {
    window.location.href = 'index.html';
}

// Event listeners
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        confirmExit();
    }
    if (event.key === 'Enter' && document.getElementById('exitConfirmation').style.display === 'block') {
        exitQuiz();
    }
});

document.getElementById('questionCount').addEventListener('input', function(e) {
    const value = parseInt(e.target.value);
    if (value < 5) {
        e.target.value = 5;
    } else if (value > osQuestions.length) {
        e.target.value = osQuestions.length;
    }
});

function selectTopic(topic) {
    // Update active topic button
    document.querySelectorAll('.topic-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`[onclick="selectTopic('${topic}')"]`).classList.add('active');

    // Reset quiz state
    currentTopic = topic;
    currentQuestionIndex = 0;
    score = 0;
    questionsAnswered = 0;

    // Start quiz with new topic
    startQuiz();
}

function startQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = `
        <div class="quiz-header">
            <h3>${currentTopic.toUpperCase()} Quiz</h3>
            <div class="quiz-score">Score: <span id="quizScore">0</span>/<span id="totalQuestions">${quizQuestions[currentTopic].length}</span></div>
        </div>
    `;
    
    quizQuestions[currentTopic].forEach((q, i) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `
            <p><strong>Question ${i + 1}:</strong> ${q.question}</p>
            <div class="quiz-options">
                ${q.options.map((opt, j) => `
                    <div class="quiz-option" onclick="selectOption(${i}, ${j})">
                        ${opt}
                    </div>
                `).join('')}
            </div>
            <div class="explanation" id="explanation-${i}" style="display: none;">
                ${q.explanation}
            </div>
        `;
        quizContainer.appendChild(questionDiv);
    });
}

function selectOption(questionIndex, optionIndex) {
    const questions = quizQuestions[currentTopic];
    if (questionIndex >= questions.length) return;

    const options = document.querySelectorAll(`.quiz-question:nth-child(${questionIndex + 2}) .quiz-option`);
    const explanationDiv = document.getElementById(`explanation-${questionIndex}`);
    
    // If question already answered, return
    if (options[0].style.pointerEvents === 'none') return;

    // Disable further selection
    options.forEach(opt => opt.style.pointerEvents = 'none');

    // Show correct/incorrect
    if (optionIndex === questions[questionIndex].correct) {
        options[optionIndex].style.backgroundColor = '#2ecc71';
        score++;
    } else {
        options[optionIndex].style.backgroundColor = '#e74c3c';
        options[questions[questionIndex].correct].style.backgroundColor = '#2ecc71';
    }

    // Update score
    questionsAnswered++;
    document.getElementById('quizScore').textContent = score;
    
    // Show explanation
    explanationDiv.style.display = 'block';

    // Show final score if all questions answered
    if (questionsAnswered === questions.length) {
        showFinalScore();
    }
}

function showFinalScore() {
    const questions = quizQuestions[currentTopic];
    const percentage = (score / questions.length) * 100;
    const quizContainer = document.getElementById('quizContainer');
    
    quizContainer.insertAdjacentHTML('afterbegin', `
        <div class="final-score">
            <h3>Quiz Complete!</h3>
            <p>Topic: ${currentTopic.toUpperCase()}</p>
            <p>Your Score: ${score}/${questions.length} (${percentage.toFixed(1)}%)</p>
            <button onclick="selectTopic('${currentTopic}')" class="btn-quiz">Retry Quiz</button>
        </div>
    `);
}

// Start with CPU Scheduling quiz by default
window.onload = () => selectTopic('cpu'); 